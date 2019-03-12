"use strict";
module.exports = (sequelize, DataTypes) => {
  const Intention = sequelize.define(
    "IntentionProfile",
    {
      accountid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      url: {
        type: DataTypes.STRING
      },
      is_active: {
        type: DataTypes.STRING
      },
      about: {
        type: DataTypes.STRING
      },
      session_key: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "XAccounts_IntentionPropertiesOf"
    }
  );

  Intention.associate = function(models) {
    // associations can be defined here
  };

  return Intention;
};
