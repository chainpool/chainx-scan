"use strict";
module.exports = (sequelize, DataTypes) => {
  const Intention = sequelize.define(
    "Intention",
    {
      accountid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING
      },
      about: {
        type: DataTypes.STRING
      },
      isActive: {
        type: DataTypes.STRING
      },
      isTrustee: {
        type: DataTypes.STRING
      },
      isValidator: {
        type: DataTypes.STRING
      },
      jackpot: {
        type: DataTypes.BIGINT
      },
      jackpotAddress: {
        type: DataTypes.STRING
      },
      lastTotalVoteWeight: {
        type: DataTypes.BIGINT
      },
      lastTotalVoteWeightUpdate: {
        type: DataTypes.BIGINT
      },
      selfVote: {
        type: DataTypes.BIGINT
      },
      sessionKey: {
        type: DataTypes.STRING
      },
      totalNomination: {
        type: DataTypes.BIGINT
      },
      url: {
        type: DataTypes.STRING
      },
      height: {
        type: DataTypes.BIGINT
      },
      blocks: {
        type: DataTypes.BIGINT
      },
      missedBlocks: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "intentions"
    }
  );

  Intention.associate = function(models) {};

  return Intention;
};
