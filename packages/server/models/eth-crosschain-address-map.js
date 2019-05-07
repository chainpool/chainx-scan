"use strict";
module.exports = (sequelize, DataTypes) => {
  const EthCrossChainAddressMap = sequelize.define(
    "EthCrossChainAddressMap",
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
      tableName: "XBridgeFeatures_EthereumCrossChainOf"
    }
  );

  EthCrossChainAddressMap.associate = function(models) {
    // associations can be defined here
    EthCrossChainAddressMap.belongsTo(models.Intention, {
      foreignKey: "channel",
      targetKey: "accountid",
      as: "intention"
    });
  };

  return EthCrossChainAddressMap;
};
