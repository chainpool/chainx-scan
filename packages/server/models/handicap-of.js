"use strict";
module.exports = (sequelize, DataTypes) => {
  const HandicapOf = sequelize.define(
    "HandicapOf",
    {
      pairid: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      buy: {
        type: DataTypes.BIGINT
      },
      sell: {
        type: DataTypes.BIGINT
      },
      height: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "XSpot_HandicapOf"
    }
  );

  HandicapOf.associate = function(models) {
    // associations can be defined here
  };

  return HandicapOf;
};
