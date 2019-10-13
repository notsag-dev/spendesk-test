const {Wallet} = require('../db');

const currencies = ['USD', 'EUR', 'GBP'];

/**
 * Insert wallet into db.
 *
 */
const createWallet = (companyId, currency, balance, isMaster) => {
  if (currencies.indexOf(currency) === -1) {
    throw new Error('Invalid currency');
  }
  return Wallet.create({
    balance,
    currency,
    companyId,
    isMaster,
  });
};

/**
 * List all company's wallets.
 *
 */
const listWallets = companyId => {
  return Wallet.findAll({
    where: {
      companyId,
    },
  });
};

/**
 * Load money into master wallet.
 *
 */
const loadMasterWallet = async (currency, amount, opt = {}) => {
  const res = await Wallet.findAll({where: {isMaster: true, currency}}, opt);
  if (!res.length) {
    throw new Error(`No master wallet found for currency ${currency}`);
  }
  return res[0].update({balance: res[0].balance + amount}, opt);
};

module.exports = {
  createWallet,
  currencies,
  loadMasterWallet,
  listWallets,
};
