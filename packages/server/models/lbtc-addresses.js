"use strict";
module.exports = (sequelize, DataTypes) => {
  const LbtcAddresses = sequelize.define(
    "LbtcAddresses",
    {
      accountid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      channel: {
        type: DataTypes.STRING
      },
      addresses: {
        type: DataTypes.STRING
      },
      height: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "lbtc_addresses"
    }
  );

  LbtcAddresses.associate = function(models) {
    LbtcAddresses.belongsTo(models.Intention, {
      foreignKey: "channel",
      targetKey: "accountid",
      as: "intention"
    });
  };

  return LbtcAddresses;
};
