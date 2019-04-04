"use strict";
module.exports = (sequelize, DataTypes) => {
  const PseduIntention = sequelize.define(
    "PseduIntention",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      circulation: {
        type: DataTypes.BIGINT
      },
      jackpot: {
        type: DataTypes.BIGINT
      },
      jackpotAddress: {
        type: DataTypes.STRING
      },
      lastTotalDepositWeight: {
        type: DataTypes.BIGINT
      },
      lastTotalDepositWeightUpdate: {
        type: DataTypes.BIGINT
      },
      power: {
        type: DataTypes.BIGINT
      },
      price: {
        type: DataTypes.BIGINT
      },
      height: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "psedu_intentions"
    }
  );

  PseduIntention.associate = function(models) {};

  return PseduIntention;
};
