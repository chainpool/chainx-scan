"use strict";
module.exports = (sequelize, DataTypes) => {
  const Block = sequelize.define(
    "Event",
    {
      number: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      index: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      phase: {
        type: DataTypes.STRING
      },
      module: {
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.STRING
      },
      args: {
        type: DataTypes.STRING
      },
      data: {
        type: DataTypes.TEXT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "event"
    }
  );

  Block.associate = function(models) {
    // associations can be defined here
  };

  return Block;
};
