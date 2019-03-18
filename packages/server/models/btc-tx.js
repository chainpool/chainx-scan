"use strict";
module.exports = (sequelize, DataTypes) => {
  const BtcTx = sequelize.define(
    "BtcTx",
    {
      txid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      tx_type: {
        type: DataTypes.STRING
      },
      version: {
        type: DataTypes.BIGINT
      },
      inputs: {
        type: DataTypes.STRING
      },
      outputs: {
        type: DataTypes.STRING
      },
      lock_time: {
        type: DataTypes.BIGINT
      },
      height: {
        type: DataTypes.BIGINT
      },
      chainx_tx: {
        type: DataTypes.STRING
      },
      relay: {
        type: DataTypes.STRING
      },
      bitcoin_height: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "XBridgeOfBTC_TxFor"
    }
  );

  BtcTx.associate = function(models) {
    BtcTx.belongsTo(models.Block, { foreignKey: "bitcoin_height", targetKey: "number", as: "block" });
  };

  return BtcTx;
};
