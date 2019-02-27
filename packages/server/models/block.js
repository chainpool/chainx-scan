"use strict";
module.exports = (sequelize, DataTypes) => {
  const Block = sequelize.define(
    "Block",
    {
      number: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      hash: {
        type: DataTypes.STRING
      },
      parent_hash: {
        type: DataTypes.STRING
      },
      state_root: {
        type: DataTypes.STRING
      },
      extrinsics_root: {
        type: DataTypes.STRING
      },
      digest: {
        type: DataTypes.TEXT
      },
      justification: {
        type: DataTypes.TEXT
      },
      extrinsics: {
        type: DataTypes.BIGINT
      },
      data: {
        type: DataTypes.TEXT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "block"
    }
  );

  Block.associate = function(models) {
    // associations can be defined here
  };

  return Block;
};
