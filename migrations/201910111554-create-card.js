module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Cards', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      walletId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Wallets',
          referencesKey: 'id',
        },
      },
      currency: Sequelize.STRING,
      balance: Sequelize.FLOAT,
      number: Sequelize.STRING,
      expires: Sequelize.DATE,
      ccv: Sequelize.STRING,
      userId: Sequelize.INTEGER,
      blocked: Sequelize.BOOLEAN,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    }),
  down: queryInterface => queryInterface.dropTable('Cards'),
};
