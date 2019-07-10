"use strict";
module.exports = (sequelize, DataTypes) => {
  const BtcLockUp = sequelize.define(
    "BtcLockUp",
    {
      lock_hash: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      output_index: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      value: {
        type: DataTypes.BIGINT
      },
      lock_chainx_relay: {
        type: DataTypes.STRING
      },
      accountid: {
        type: DataTypes.STRING
      },
      lock_time: {
        type: DataTypes.BIGINT
      },
      unlock_hash: {
        type: DataTypes.STRING
      },
      input_index: {
        type: DataTypes.BIGINT
      },
      unlock_chainx_relay: {
        type: DataTypes.STRING
      },
      unlock_time: {
        type: DataTypes.BIGINT
      },
      channel: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "event_lockupbtc"
    }
  );

  BtcLockUp.associate = function(models) {};

  return BtcLockUp;
};
