"use strict";
module.exports = (sequelize, DataTypes) => {
  const TradingPair = sequelize.define(
    "TradingPair",
    {
      pairid: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      currency_pair: {
        type: DataTypes.STRING
      },
      precision: {
        type: DataTypes.BIGINT
      },
      unit_precision: {
        type: DataTypes.BIGINT
      },
      online: {
        type: DataTypes.STRING
      },
      height: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "XSpot_TradingPairOf"
    }
  );

  TradingPair.associate = function(models) {
    TradingPair.belongsTo(models.TradingPairPrice, { foreignKey: "pairid", targetKey: "pairid", as: "price" });
    TradingPair.belongsTo(models.HandicapOf, { foreignKey: "pairid", targetKey: "pairid", as: "handicap" });
    // associations can be defined here
  };

  return TradingPair;
};
