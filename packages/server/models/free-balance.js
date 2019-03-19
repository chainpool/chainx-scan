"use strict";
module.exports = (sequelize, DataTypes) => {
  const FreeBalance = sequelize.define(
    "FreeBalance",
    {
      accountid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      balance: {
        type: DataTypes.BIGINT
      },
      height: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "Balances_FreeBalance"
    }
  );

  FreeBalance.associate = function(models) {
    // associations can be defined here
  };

  return FreeBalance;
};
