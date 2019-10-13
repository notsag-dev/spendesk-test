const {transferService} = require('../services');
const {auth} = require('../middleware/auth');

module.exports.set = app => {
  app.post('/transfer', auth, async (req, res) => {
    const userId = parseInt(req.get('user-id'), 10);
    const companyId = parseInt(req.get('company-id'), 10);
    const {idFrom, idTarget, typeFrom, typeTarget, amount} = req.body;
    if (!idFrom || !idTarget || !typeFrom || !typeTarget || !amount) {
      res
        .status(400)
        .send({
          message:
            'Missing body paramters. You must include: idFrom, idTarget, typeFrom, typeTarget and amount',
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
