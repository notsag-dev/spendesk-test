const cardController = require('./card');
const transferController = require('./transfer');
const walletController = require('./wallet');

/**
 * Set routes for all controllers.
 *
 */
module.exports.set = (app) => {
  cardController.set(app);
  transferController.set(app);
  walletController.set(app);
};
