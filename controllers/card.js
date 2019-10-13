const {cardService} = require('../services');
const {auth} = require('../middleware/auth');
const {isNumeric} = require('../utils');

module.exports.set = app => {
  app.post('/card/create', auth, async (req, res) => {
    try {
      await cardService.createCard(
        parseInt(req.get('user-id'), 10),
        parseInt(req.get('company-id'), 10),
        req.body.walletId,
        0,
      );
    } catch (err) {
      console.log(err);
      res.status(500).send();
      return;
    }
    res.status(200).send();
  });

  app.get('/card/list', auth, async (req, res) => {
    const userId = parseInt(req.get('user-id'), 10);
    try {
      const cards = await cardService.listCards(userId);
      res.status(200).send(cards);
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  });

  app.post('/card/:cardId/load', auth, async (req, res) => {
    const userId = parseInt(req.get('user-id'), 10);
    const amount = parseFloat(req.body.amount);
    const cardId = parseInt(req.params.cardId, 10);
    if (!isNumeric(amount) || amount < 0 || !isNumeric(cardId)) {
      res.status(400).send({message: 'Passed parameters are not valid'});
      return;
    }
    try {
      await cardService.updateCardBalance(userId, cardId, amount);
    } catch (err) {
      console.log(err);
      res.status(500).send();
      return;
    }
    res.status(200).send();
  });

  app.post('/card/:cardId/unload', auth, async (req, res) => {
    const userId = parseInt(req.get('user-id'), 10);
    const amount = parseFloat(req.body.amount);
    const cardId = parseInt(req.params.cardId, 10);
    if (!isNumeric(amount) || amount < 0 || !isNumeric(cardId)) {
      res.status(400).send({message: 'Passed parameters are not valid'});
      return;
    }
    try {
      await cardService.updateCardBalance(userId, cardId, -amount);
    } catch (err) {
      console.log(err);
      res.status(500).send();
      return;
    }
    res.status(200).send();
  });

  app.post('/card/:cardId/block', auth, async (req, res) => {
    const userId = parseInt(req.get('user-id'), 10);
    const cardId = parseInt(req.params.cardId, 10);
    if (!isNumeric(cardId)) {
      res.status(400).send({message: 'Passed parameters are not valid'});
      return;
    }
    try {
      await cardService.blockCard(userId, cardId);
    } catch (err) {
      console.log(err);
      res.status(500).send();
      return;
    }
    res.status(200).send();
  });

  app.post('/card/:cardId/unblock', auth, async (req, res) => {
    const userId = parseInt(req.get('user-id'), 10);
    const cardId = parseInt(req.params.cardId, 10);
    if (!isNumeric(cardId)) {
      res.status(400).send({message: 'Passed parameters are not valid'});
      return;
    }
    try {
      await cardService.unblockCard(userId, cardId);
    } catch (err) {
      console.log(err);
      res.status(500).send();
      return;
    }
    res.status(200).send();
  });
};
