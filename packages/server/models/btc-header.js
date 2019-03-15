"use strict";
module.exports = (sequelize, DataTypes) => {
  const BtcHeader = sequelize.define(
    "BtcHeader",
    {
      header: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      version: {
        type: DataTypes.BIGINT
      },
      parent: {
        type: DataTypes.STRING
      },
      merkle: {
        type: DataTypes.STRING
      },
      time: {
        type: DataTypes.BIGINT
      },
      bits: {
        type: DataTypes.BIGINT
      },
      nonce: {
        type: DataTypes.BIGINT
      },
      confirmed: {
        type: DataTypes.STRING
      },
      height: {
        type: DataTypes.BIGINT
      },
      bitcoin_height: {
        type: DataTypes.STRING
      },
      txid: {
        type: DataTypes.STRING
      },
      chainx_tx: {
        type: DataTypes.STRING
      },
      relay: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "XBridgeOfBTC_BlockHeaderFor"
    }
  );

  BtcHeader.associate = function(models) {
    // associations can be defined here
  };

  return BtcHeader;
};
