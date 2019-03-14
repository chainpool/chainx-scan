"use strict";
module.exports = (sequelize, DataTypes) => {
  const Kline = sequelize.define(
    "Kline",
    {
      pairid: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      type: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      time: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      open: {
        type: DataTypes.BIGINT
      },
      high: {
        type: DataTypes.BIGINT
      },
      low: {
        type: DataTypes.BIGINT
      },
      close: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "kline"
    }
  );

  Kline.associate = function(models) {
    // associations can be defined here
  };

  return Kline;
};
