module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Transfers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      amountTransferred: Sequelize.FLOAT,
      originCurrency: Sequelize.STRING,
      targetCurrency: Sequelize.STRING,
      conversionFee: Sequelize.FLOAT,
      originEntity: Sequelize.INTEGER,
      originEntityType: Sequelize.STRING,
      targetEntity: Sequelize.INTEGER,
      targetEntityType: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    }),
  down: queryInterface => queryInterface.dropTable('Transfers'),
};
