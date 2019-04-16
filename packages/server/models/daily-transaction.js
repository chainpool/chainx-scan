"use strict";
module.exports = (sequelize, DataTypes) => {
  const DailyTransactions = sequelize.define(
    "DailyTransactions",
    {
      day: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      num: {
        type: DataTypes.BIGINT
      },
      height: {
        type: DataTypes.BIGINT,
        primaryKey: true
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "transaction_daily"
    }
  );

  DailyTransactions.associate = function(models) {
    DailyTransactions.belongsTo(models.Block, { foreignKey: "height", targetKey: "number", as: "block" });
  };

  return DailyTransactions;
};
