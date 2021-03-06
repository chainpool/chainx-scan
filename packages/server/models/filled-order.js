"use strict";
module.exports = (sequelize, DataTypes) => {
  const FilledOrder = sequelize.define(
    "FilledOrder",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      pairid: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      price: {
        type: DataTypes.BIGINT
      },
      maker_user: {
        type: DataTypes.STRING
      },
      taker_user: {
        type: DataTypes.STRING
      },
      maker_user_order_index: {
        type: DataTypes.BIGINT
      },
      taker_user_order_index: {
        type: DataTypes.BIGINT
      },
      amount: {
        type: DataTypes.BIGINT
      },
      time: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "event_xspot_FillsOf"
    }
  );

  FilledOrder.associate = function(models) {
    FilledOrder.belongsTo(models.Block, { foreignKey: "time", targetKey: "number", as: "block" });
  };

  return FilledOrder;
};
