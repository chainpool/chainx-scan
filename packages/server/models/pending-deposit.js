"use strict";
module.exports = (sequelize, DataTypes) => {
  const PendingDeposit = sequelize.define(
    "PendingDeposit",
    {
      address: {
        type: DataTypes.STRING
      },
      txid_balance: {
        type: DataTypes.STRING
      },
      height: {
        type: DataTypes.BIGINT,
        primaryKey: true
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "XBridgeOfBTC_PendingDepositMap"
    }
  );

  PendingDeposit.removeAttribute("id");
  PendingDeposit.associate = function(models) {};

  return PendingDeposit;
};
