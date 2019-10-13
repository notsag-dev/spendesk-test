const config = require('../config/config');

// TODO consume external API
const exchangeRates = {
  'EUR': {
    'USD': 1.2,
    'GBP': 0.9,
  },
  'USD': {
    'EUR': 0.9,
    'GBP': 0.8,
  },
  'GBP': {
    'EUR': 1.1,
    'USD': 1.2,
  }
}

const getConversionInfo = (currencyFrom, currencyTarget, amount) => {
  if (currencyFrom === currencyTarget) {
    return {converted: false};
  }
  const rate = exchangeRates[currencyFrom][currencyTarget];
  const totalTargetGross = amount * rate;
  const fee = totalTargetGross * config.conversionFee;
  const totalTargetNet = totalTargetGross - fee;
  return {
    converted: true,
    rate,
    totalTargetGross,
    fee,
    totalTargetNet,
  };
};

module.exports = {getConversionInfo}
