"use strict";
module.exports = (sequelize, DataTypes) => {
  // TODO: 该表目前没有定义主键
  const Trustee = sequelize.define(
    "Trustee",
    {
      accountid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      about: {
        type: DataTypes.STRING
      },
      hot_entity: {
        type: DataTypes.STRING
      },
      cold_entity: {
        type: DataTypes.STRING
      },
      height: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "XBridgeFeatures_BitcoinTrusteeIntentionPropertiesOf"
    }
  );

  Trustee.associate = function(models) {};

  return Trustee;
};
