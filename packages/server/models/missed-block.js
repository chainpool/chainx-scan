"use strict";
module.exports = (sequelize, DataTypes) => {
  const MissedBlocks = sequelize.define(
    "MissedBlocks",
    {
      accountid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      missed: {
        type: DataTypes.BIGINT
      },
      height: {
        type: DataTypes.BIGINT,
        primaryKey: true
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "missed_blocks_offline_validator"
    }
  );

  MissedBlocks.associate = function(models) {};

  return MissedBlocks;
};
