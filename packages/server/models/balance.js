"use strict";
module.exports = (sequelize, DataTypes) => {
  const Balance = sequelize.define(
    "Balance",
    {
      accountid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      token: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      Free: {
        type: DataTypes.BIGINT
      },
      ReservedStaking: {
        type: DataTypes.BIGINT
      },
      ReservedStakingRevocation: {
        type: DataTypes.BIGINT
      },
      ReservedWithdrawal: {
        type: DataTypes.BIGINT
      },
      ReservedDexSpot: {
        type: DataTypes.BIGINT
      },
      ReservedDexFuture: {
        type: DataTypes.BIGINT
      },
      height: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "XAssets_AssetBalance"
    }
  );

  Balance.associate = function(models) {
    // associations can be defined here
  };

  return Balance;
};
