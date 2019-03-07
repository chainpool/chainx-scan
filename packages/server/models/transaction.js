"use strict";
module.exports = (sequelize, DataTypes) => {
  const Block = sequelize.define(
    "Transaction",
    {
      number: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      index: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      hash: {
        type: DataTypes.STRING
      },
      signed: {
        type: DataTypes.STRING
      },
      signature: {
        type: DataTypes.STRING
      },
      account_index: {
        type: DataTypes.BIGINT
      },
      era: {
        type: DataTypes.STRING
      },
      module: {
        type: DataTypes.STRING
      },
      call: {
        type: DataTypes.STRING
      },
      help: {
        type: DataTypes.STRING
      },
      args: {
        type: DataTypes.TEXT
      },
      data: {
        type: DataTypes.TEXT
      },
      version: {
        type: DataTypes.BIGINT
      },
      acceleration: {
        type: DataTypes.BIGINT
      },
      time: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "transaction"
    }
  );

  Block.associate = function(models) {
    // associations can be defined here
  };

  return Block;
};
