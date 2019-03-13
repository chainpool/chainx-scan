"use strict";
module.exports = (sequelize, DataTypes) => {
  const Nomination = sequelize.define(
    "Nomination",
    {
      nominator: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      nominee: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      nomination: {
        type: DataTypes.BIGINT
      },
      last_vote_weight: {
        type: DataTypes.BIGINT
      },
      last_vote_weight_update: {
        type: DataTypes.BIGINT
      },
      revocations: {
        type: DataTypes.STRING
      },
      height: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "XStaking_NominationRecords"
    }
  );

  Nomination.associate = function(models) {};

  return Nomination;
};
