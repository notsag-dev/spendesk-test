const {transferService} = require('../services');
const {auth} = require('../middleware/auth');
const {isNumeric} = require('../utils');

module.exports.set = app => {
  app.post('/transfer', auth, async (req, res) => {
    const userId = parseInt(req.get('user-id'), 10);
    const companyId = parseInt(req.get('company-id'), 10);
    const {idFrom, idTarget, typeFrom, typeTarget, amount} = req.body;
    if (
      !idFrom ||
      !idTarget ||
      !typeFrom ||
      !typeTarget ||
      !amount ||
      !isNumeric(amount)
    ) {
      res.status(400).send({
        message: 'Body parameters did not pass validations',
      });
      return;
    }
    try {
      await transferService.transfer(
        userId,
        companyId,
        idFrom,
        typeFrom,
        idTarget,
        typeTarget,
        amount,
      );
    } catch (err) {
      console.log(err);
      res.status(500).send();
      return;
    }
    res.status(200).send();
  });
};
