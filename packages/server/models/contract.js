"use strict";
module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define(
    "Contract",
    {
      contract: {
        // 合约地址
        type: DataTypes.STRING,
        primaryKey: true
      },
      code_hash: {
        type: DataTypes.STRING
      },
      height: {
        type: DataTypes.BIGINT
      },
      account: {
        // 部署账户
        type: DataTypes.STRING
      },
      abi: {
        type: DataTypes.TEXT
      },
      tx: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "contracts"
    }
  );

  Contract.associate = function(models) {
    // associations can be defined here
  };

  return Contract;
};
