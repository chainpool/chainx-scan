"use strict";
module.exports = (sequelize, DataTypes) => {
  const SessionTrusteeInfo = sequelize.define(
    "SessionTrusteeInfo",
    {
      chain: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      trustee_list: {
        type: DataTypes.STRING
      },
      hot_address_list: {
        type: DataTypes.STRING
      },
      cold_address_list: {
        type: DataTypes.STRING
      },
      height: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "XAccounts_TrusteeSessionInfoOf"
    }
  );

  SessionTrusteeInfo.associate = function(models) {};

  return SessionTrusteeInfo;
};
