"use strict";
module.exports = (sequelize, DataTypes) => {
  const SessionTrusteeInfo = sequelize.define(
    "SessionTrusteeInfo",
    {
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
      tableName: "XBridgeFeatures_BitcoinTrusteeSessionInfoOf"
    }
  );

  SessionTrusteeInfo.associate = function(models) {};

  return SessionTrusteeInfo;
};
