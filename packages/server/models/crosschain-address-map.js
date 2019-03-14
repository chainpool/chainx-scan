"use strict";
module.exports = (sequelize, DataTypes) => {
  const CrossChainAddressMap = sequelize.define(
    "CrossChainAddressMap",
    {
      chain: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      address: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      accountid: {
        type: DataTypes.STRING
      },
      channel: {
        type: DataTypes.STRING
      },
      height: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "XAccounts_CrossChainAddressMapOf"
    }
  );

  CrossChainAddressMap.associate = function(models) {
    // associations can be defined here
  };

  return CrossChainAddressMap;
};
