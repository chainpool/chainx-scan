"use strict";
module.exports = (sequelize, DataTypes) => {
  const Intention = sequelize.define(
    "Intention",
    {
      name: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      accountid: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "XAccounts_IntentionOf"
    }
  );

  Intention.associate = function(models) {
    Intention.belongsTo(models.IntentionProfile, { foreignKey: "accountid", targetKey: "accountid", as: "profile" });
  };

  return Intention;
};
