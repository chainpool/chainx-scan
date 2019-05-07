"use strict";
module.exports = (sequelize, DataTypes) => {
  const BtcCrossChainAddressMap = sequelize.define(
    "BtcCrossChainAddressMap",
    {
      address: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      accountid: {
        type: DataTypes.STRING
      },
      channel: {
        type: DataTypes.STRING
      },
      height: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "XBridgeFeatures_BitcoinCrossChainOf"
    }
  );

  BtcCrossChainAddressMap.associate = function(models) {
    // associations can be defined here
    BtcCrossChainAddressMap.belongsTo(models.Intention, {
      foreignKey: "channel",
      targetKey: "accountid",
      as: "intention"
    });
  };

  return BtcCrossChainAddressMap;
};
