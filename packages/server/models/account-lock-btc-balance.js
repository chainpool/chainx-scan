"use strict";
module.exports = (sequelize, DataTypes) => {
  const AccountLockBtcBalances = sequelize.define(
    "AccountLockBtcBalances",
    {
      accountid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      address: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      lock: {
        type: DataTypes.BIGINT
      },
      unlock: {
        type: DataTypes.BIGINT
      },
      height: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "event_lockupbtc_total"
    }
  );

  AccountLockBtcBalances.associate = function(models) {
    // associations can be defined here
  };

  return AccountLockBtcBalances;
};
