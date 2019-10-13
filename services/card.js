const {sequelize, Card, Wallet} = require('../db');

// TODO Move to helpers
const getRandomNumString = (length) => {
  const max = 10 ** length;
  const auxRand = String(Math.floor(Math.random() * max));
  return auxRand.padStart(length, '0');
}

/**
 * Creates a new card on the database
 */
const createCard = async (userId, companyId, walletId) => {
  const wallet = await Wallet.findByPk(walletId);
  if (wallet.companyId !== companyId) {
    throw new Error(
      `Forbidden operation. User ${userId} does not have access to wallet ${walletId}`,
    );
  }
  const expires = new Date();
  expires.setMonth(expires.getMonth() + 1);
  return Card.create({
    userId,
    walletId,
    currency: wallet.currency,
    number: getRandomNumString(16),
    expires,
    ccv: getRandomNumString(3),
    blocked: false,
    balance: 0,
  });
};

const listCards = userId => {
  return Card.findAll({
    where: {
      userId,
    },
  });
};

const validateUserCard = (userId, card) => {
  if (card.userId !== userId) {
    throw new Error(
      `Forbidden operation. User ${userId} does not own card ${card.id}`,
    );
  }
  if (card.blocked) {
    throw new Error(
      `Card is blocked. User: ${userId}. Card: ${card.id}`,
    );
  }
}

/**
 * Load or unload money on/from card depending on the sign of amount.
 *
 */
const updateCardBalance = (userId, cardId, amount) => {
  return sequelize.transaction(async t => {
    const opt = {transaction: t, lock: true};
    const card = await Card.findByPk(cardId, opt);
    await validateUserCard(userId, card);
    const wallet = await Wallet.findByPk(card.walletId, opt);
    if (
      (amount > 0 && wallet.balance < amount) ||
      (amount < 0 && card.balance < -amount)
    ) {
      throw new Error('Balance not enough for completing update')
    };
    const walletBalance = wallet.balance - amount;
    const cardBalance = card.balance + amount;
    await Promise.all([
      card.update({balance: cardBalance}, opt),
      wallet.update({balance: walletBalance}, opt),
    ]);
  });
};

const blockCard = (userId, cardId) => {
  return sequelize.transaction(async t => {
    const opt = {transaction: t, lock: true};
    const card = await Card.findByPk(cardId, opt);
    await validateUserCard(userId, card);
    const wallet = await Wallet.findByPk(card.walletId, opt);
    const walletBalance = wallet.balance + card.balance;
    const cardBalance = 0;
    return Promise.all([
      card.update({balance: cardBalance, blocked: true}, opt),
      wallet.update({balance: walletBalance}, opt),
    ]);
  });
};

const unblockCard = async (userId, cardId) => {
  const card = await Card.findByPk(cardId);
  if (card.userId !== userId) {
    throw new Error(
      `Forbidden operation. User ${userId} does not own card ${cardId}`,
    );
  }
  return card.update({blocked: false});
};

module.exports = {
  blockCard,
  createCard,
  getRandomNumString,
  listCards,
  unblockCard,
  updateCardBalance,
};
