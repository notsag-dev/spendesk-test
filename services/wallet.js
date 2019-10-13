const {Wallet} = require('../db');

const createWallet = (companyId, currency, balance, isMaster) => {
  return Wallet.create({
    balance,
    currency,
    companyId,
    isMaster,
  });
};

const listWallets = companyId => {
  return Wallet.findAll({
    where: {
      companyId,
    },
  });
};

const loadMasterWallet = async (currency, amount, opt = {}) => {
  const res = await Wallet.findAll({where: {isMaster: true, currency}}, opt);
  if (!res.length) {
    throw new Error(`No master wallet found for currency ${currency}`);
  }
  return res[0].update({balance: res[0].balance + amount}, opt);
};

module.exports = {
  createWallet,
  loadMasterWallet,
  listWallets,
};
