"use strict";
module.exports = (sequelize, DataTypes) => {
  const Withdraw = sequelize.define(
    "Withdraw",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      accountid: {
        type: DataTypes.STRING
      },
      token: {
        type: DataTypes.STRING
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
        type: DataTypes.STRING
      },
      txstate: {
        type: DataTypes.STRING
      },
      height: {
        type: DataTypes.BIGINT
      },
      chain: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "event_WithdrawRecord"
    }
  );

  Withdraw.associate = function(models) {
    // associations can be defined here
  };

  return Withdraw;
};
