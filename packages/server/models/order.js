"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      accountid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      pairid: {
        type: DataTypes.BIGINT
      },
      price: {
        type: DataTypes.BIGINT
      },
      index: {
        type: DataTypes.BIGINT
      },
      account: {
        type: DataTypes.STRING
      },
      class: {
        type: DataTypes.STRING
      },
      direction: {
        type: DataTypes.STRING
      },
      amount: {
        type: DataTypes.BIGINT
      },
      hasfill_amount: {
        type: DataTypes.BIGINT
      },
      create_time: {
        type: DataTypes.BIGINT
      },
      lastupdate_time: {
        type: DataTypes.BIGINT
      },
      status: {
        type: DataTypes.BIGINT
      },
      reserve_last: {
        type: DataTypes.BIGINT
      },
      fill_index: {
        type: DataTypes.STRING
      },
      height: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "XSpot_OrderInfoOf"
    }
  );

  Order.associate = function(models) {
    Order.belongsTo(models.Block, { foreignKey: "create_time", targetKey: "number", as: "block" });
  };

  return Order;
};
