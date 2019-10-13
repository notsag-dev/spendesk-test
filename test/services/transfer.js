const assert = require('assert');
const {Transfer, Wallet} = require('../../db');
const {transferService} = require('../../services');

describe('Transfer service', () => {
  describe('transfer', () => {
    it('updates successfully origin wallet balance in a wallet to wallet transfer (same currency)', async () => {
      await Wallet.destroy({where:{}});
      await Promise.all([
        Transfer.destroy({where:{}}),
        Wallet.create({balance: 1000, currency: 'EUR', companyId: 1, isMaster: false}),
        Wallet.create({balance: 1000, currency: 'EUR', companyId: 1, isMaster: false}),
      ]);
      const wallets = await Wallet.findAll({order:[['id', 'ASC']]});
      await transferService.transfer(1, 1, wallets[0].id, 'wallet', wallets[1].id, 'wallet', 100);
      const walletsAfter = await Wallet.findAll({order:[['id', 'ASC']]});
      assert.equal(walletsAfter[0].balance, 900);
    });

    it('updates successfully target wallet balance in a wallet to wallet transfer (same currency)', async () => {
      await Wallet.destroy({where:{}});
      await Promise.all([
        Transfer.destroy({where:{}}),
        Wallet.create({balance: 1000, currency: 'EUR', companyId: 1, isMaster: false}),
        Wallet.create({balance: 1000, currency: 'EUR', companyId: 1, isMaster: false}),
      ]);
      const wallets = await Wallet.findAll({order:[['id', 'ASC']]});
      await transferService.transfer(1, 1, wallets[0].id, 'wallet', wallets[1].id, 'wallet', 100);
      const walletsAfter = await Wallet.findAll({order:[['id', 'ASC']]});
      assert.equal(walletsAfter[1].balance, 1100);
    })

    it('updates successfully origin wallet balance in a wallet to wallet transfer (different currency)', async () => {
      await Wallet.destroy({where:{}});
      await Promise.all([
        Transfer.destroy({where:{}}),
        Wallet.create({balance: 1000, currency: 'EUR', companyId: 1, isMaster: false}),
        Wallet.create({balance: 1000, currency: 'USD', companyId: 1, isMaster: false}),
        Wallet.create({balance: 1000, currency: 'USD', companyId: 1, isMaster: true}),
      ]);
      const wallets = await Wallet.findAll({order:[['id', 'ASC']]});
      await transferService.transfer(1, 1, wallets[0].id, 'wallet', wallets[1].id, 'wallet', 100);
      const walletsAfter = await Wallet.findAll({order:[['id', 'ASC']]});
      assert.equal(walletsAfter[0].balance, 900);
    });

    it('updates successfully target wallet balance in a wallet to wallet transfer (different currency)', async () => {
      await Wallet.destroy({where:{}});
      await Promise.all([
        Transfer.destroy({where:{}}),
        Wallet.create({balance: 1000, currency: 'EUR', companyId: 1, isMaster: false}),
        Wallet.create({balance: 1000, currency: 'USD', companyId: 1, isMaster: false}),
        Wallet.create({balance: 0, currency: 'USD', companyId: 1, isMaster: true}),
      ]);
      const wallets = await Wallet.findAll({order:[['id', 'ASC']]});
      await transferService.transfer(1, 1, wallets[0].id, 'wallet', wallets[1].id, 'wallet', 100);
      const walletsAfter = await Wallet.findAll({order:[['id', 'ASC']]});

      // NOTE: This test assumes that exchange rates and fees are fixed for simplicity.
      // gross transfer = 100 * 1.2 (conv EUR -> USD) = 120
      // fee = 120 * 0.029
      // net transfer = gross transfer - fee = 1200 - 3.48 = 116.52
      // target balance = previous balance + net transfer = 1000 + 116.52
      assert.equal(walletsAfter[1].balance, 1116.52);
    });

    it('updates successfully master wallet balance in a wallet to wallet transfer (different currency)', async () => {
      await Wallet.destroy({where:{}});
      await Promise.all([
        Transfer.destroy({where:{}}),
        Wallet.create({balance: 1000, currency: 'EUR', companyId: 1, isMaster: false}),
        Wallet.create({balance: 1000, currency: 'USD', companyId: 1, isMaster: false}),
        Wallet.create({balance: 0, currency: 'USD', companyId: 1, isMaster: true}),
      ]);
      const wallets = await Wallet.findAll({order:[['id', 'ASC']]});
      await transferService.transfer(1, 1, wallets[0].id, 'wallet', wallets[1].id, 'wallet', 100);
      const res = await Wallet.findAll({where: {isMaster: true, currency: 'USD'}});
      assert.equal(res[0].balance, 3.48);
    });
  });
})
