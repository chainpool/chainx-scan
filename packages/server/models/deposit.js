"use strict";
module.exports = (sequelize, DataTypes) => {
  const Deposit = sequelize.define(
    "Deposit",
    {
      accountid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      token: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      balance: {
        type: DataTypes.BIGINT
      },
      address: {
        type: DataTypes.STRING
      },
      memo: {
        type: DataTypes.STRING
      },
      txid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      txstate: {
        type: DataTypes.STRING
      },
      height: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      chain: {
        type: DataTypes.STRING,
        primaryKey: true
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "event_DepositRecord"
    }
  );

  Deposit.associate = function(models) {
    Deposit.belongsTo(models.Block, { foreignKey: "height", targetKey: "number", as: "block" });
  };

  return Deposit;
};
