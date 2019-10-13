module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable('Wallets', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        balance: Sequelize.FLOAT,
        currency: Sequelize.STRING,
        companyId: Sequelize.INTEGER,
        isMaster: Sequelize.BOOLEAN,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }),
  down: queryInterface => queryInterface.dropTable('Wallets')
};
