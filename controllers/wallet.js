const {walletService} = require('../services');
const {auth} = require('../middleware/auth');

module.exports.set = app => {
  app.post('/wallet/create', auth, async (req, res) => {
    const companyId = parseInt(req.get('company-id'), 10);

    // Let's assume companyId === 1 is the main one. Otherwise do not create
    // it as master.
    const masterWallet = Boolean(req.body.master && companyId === 1);
    const {currency} = req.body;

    if (!currency) {
      res.status(400).send({message: 'currency not present on the request'});
      return;
    }
    try {
      await walletService.createWallet(companyId, currency, 10000, masterWallet);
    } catch (err) {
      console.log(err);
      res.status(500).send();
      return;
    }
    res.status(200).send();
  });

  app.get('/wallet/list', auth, async (req, res) => {
    const companyId = parseInt(req.get('company-id'), 10);
    let wallets = [];
    try {
      wallets = await walletService.listWallets(companyId);
    } catch (err) {
      console.log(err);
      res.status(500).send();
      return;
    }
    res.status(200).send(wallets);
  });
};
