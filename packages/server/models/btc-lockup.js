"use strict";
module.exports = (sequelize, DataTypes) => {
  const BtcLockUp = sequelize.define(
    "BtcLockUp",
    {
      hash: {
        // Bitcoin交易哈希
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      index: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
      },
      address: {
        // Bitcoin地址
        type: DataTypes.STRING,
        allowNull: false
      },
      value: {
        type: DataTypes.BIGINT
      },
      accountid: {
        type: DataTypes.STRING
      },
      channel: {
        type: DataTypes.STRING
      },
      relay_hash: {
        // 中继交易哈希
        type: DataTypes.STRING
      },
      pre_hash: {
        // 上一笔关联的交易哈希
        type: DataTypes.BIGINT
      },
      pre_index: {
        // 上一笔关联交易的index
        type: DataTypes.BIGINT
      },
      height: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      type: {
        // 0=Lock, 1=Unlock
        type: DataTypes.BIGINT,
        allowNull: false
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "event_lockupbtc"
    }
  );

  BtcLockUp.associate = function(models) {
    BtcLockUp.belongsTo(models.Block, { foreignKey: "height", targetKey: "number", as: "block" });
  };

  return BtcLockUp;
};
