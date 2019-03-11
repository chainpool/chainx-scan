"use strict";
module.exports = (sequelize, DataTypes) => {
  const Handicap = sequelize.define(
    "Handicap",
    {
      pairid: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      direction: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      price: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      amount: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "handicap"
    }
  );

  Handicap.associate = function(models) {
    // associations can be defined here
  };

  return Handicap;
};
