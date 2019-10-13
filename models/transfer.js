module.exports = (sequelize, DataTypes) => {
  const Transfer = sequelize.define('Transfer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amountTransferred: DataTypes.FLOAT,
    originCurrency: DataTypes.STRING,
    targetCurrency: DataTypes.STRING,
    conversionFee: DataTypes.FLOAT,
    originEntity: DataTypes.INTEGER,
    originEntityType: DataTypes.STRING,
    targetEntity: DataTypes.INTEGER,
    targetEntityType: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });

  return Transfer;
};
