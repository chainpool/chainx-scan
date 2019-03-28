"use strict";
module.exports = (sequelize, DataTypes) => {
  const AccountNonce = sequelize.define(
    "AccountNonce",
    {
      accountid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      nonce: {
        type: DataTypes.BIGINT
      },
      height: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "System_AccountNonce"
    }
  );

  AccountNonce.associate = function(models) {
    // associations can be defined here
  };

  return AccountNonce;
};
