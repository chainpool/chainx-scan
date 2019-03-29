"use strict";
module.exports = (sequelize, DataTypes) => {
  const BtcStatus = sequelize.define(
    "BtcStatus",
    {
      trustee_session: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      hot_balance: {
        type: DataTypes.BIGINT
      },
      cold_balance: {
        type: DataTypes.BIGINT
      },
      hot_address: {
        type: DataTypes.STRING
      },
      cold_address: {
        type: DataTypes.STRING
      },
      deposit_count: {
        type: DataTypes.BIGINT
      },
      withdraw_count: {
        type: DataTypes.BIGINT
      },
      bind_count: {
        type: DataTypes.BIGINT
      },
      height: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "status_bitcoin"
    }
  );

  BtcStatus.associate = function(models) {};

  return BtcStatus;
};
