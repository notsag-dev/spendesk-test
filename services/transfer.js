const walletService = require('./wallet');
const {getConversionInfo} = require('./conversion');
const {sequelize, Transfer, Wallet, Card} = require('../db');

const getWalletOrCard = (type, id, queryOpt = {}) => {
  switch (type) {
    case 'wallet':
      return Wallet.findByPk(id, queryOpt);
    case 'card':
      return Card.findByPk(id, queryOpt);
    default:
      throw new Error('Incorrect entity type. It must be wallet or card');
  }
};

const validateTransfer = (userId, companyId, entityFrom, typeFrom, entityTarget, typeTarget, amount) => {
  if (
    (entityFrom.userId && entityFrom.userId !== userId) ||
    (entityFrom.companyId &&
      entityFrom.companyId !== companyId)
  ) {
    throw new Error(
      `Forbidden tx for user ${userId}, ${typeFrom} ${entityFrom.id}`,
    );
  }
  console.log('CHEEEECK', entityFrom.balance, entityFrom.balance)
  if (entityFrom.balance < amount) {
    throw Error('Balance is not enough for completing transference');
  }
  if (typeFrom === 'card' && entityFrom.blocked || typeTarget === 'card' && entityTarget.blocked) {
    throw Error('One of the entities is a blocked card');
  }
};

const transfer = async (
  userId,
  companyId,
  idFrom,
  typeFrom,
  idTarget,
  typeTarget,
  amount,
) => {
  return sequelize.transaction(async t => {
    const opt = {transaction: t, lock: true};
    const entityFrom = await getWalletOrCard(typeFrom, idFrom, opt);
    const entityTarget = await getWalletOrCard(typeTarget, idTarget, opt);
    validateTransfer(userId, companyId, entityFrom, typeFrom, entityTarget, typeTarget, amount);
    const conversionInfo = getConversionInfo(
      entityFrom.currency,
      entityTarget.currency,
      amount,
    );
    const transferPromise = Transfer.create(
      {
        amountTransferred: amount,
        originCurrency: entityFrom.currency,
        targetCurrency: entityTarget.currency,
        conversionFee: conversionInfo.fee || 0,
        originEntity: entityFrom.id,
        originEntityType: typeFrom,
        targetEntity: entityTarget.id,
        targetEntityType: typeTarget,
      },
      {transaction: t},
    );
    const balanceTarget = conversionInfo.converted
      ? entityTarget.balance + conversionInfo.totalTargetNet
      : entityTarget.balance + amount;
    const promises = [
      transferPromise,
      entityFrom.update({balance: entityFrom.balance - amount}, opt),
      entityTarget.update({balance: balanceTarget}, opt),
    ];
    if (conversionInfo.fee) {
      promises.push(
        walletService.loadMasterWallet(
          entityTarget.currency,
          conversionInfo.fee,
          opt,
        ),
      );
    }
    return Promise.all(promises);
  });
};

module.exports = {transfer};
