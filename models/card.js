module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    walletId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Wallets',
        referencesKey: 'id',
      },
    },
    currency: DataTypes.STRING,
    balance: DataTypes.FLOAT,
    number: DataTypes.STRING,
    expires: DataTypes.DATE,
    ccv: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    blocked: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });

  Card.associate = models => {
    Card.belongsTo(models.Wallet, {
      foreignKey: 'walletId',
    });
  };

  return Card;
};
