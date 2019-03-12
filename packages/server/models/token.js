"use strict";
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    "Token",
    {
      token: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      token_name: {
        type: DataTypes.STRING
      },
      chain: {
        type: DataTypes.STRING
      },
      precision: {
        type: DataTypes.BIGINT
      },
      des: {
        type: DataTypes.STRING
      },
      ok: {
        type: DataTypes.STRING
      },
      num: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "XAssets_AssetInfo"
    }
  );

  Token.associate = function(models) {};

  return Token;
};
