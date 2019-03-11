"use strict";
module.exports = (sequelize, DataTypes) => {
  const TradingPairPrice = sequelize.define(
    "TradingPairPrice",
    {
      pairid: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      last_price: {
        type: DataTypes.BIGINT
      },
      aver_price: {
        type: DataTypes.BIGINT
      },
      update_height: {
        type: DataTypes.BIGINT
      },
      height: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "XSpot_TradingPairInfoOf"
    }
  );

  TradingPairPrice.associate = function(models) {};

  return TradingPairPrice;
};
