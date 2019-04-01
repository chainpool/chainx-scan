"use strict";
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
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
      },
      transaction_tx: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "event"
    }
  );

  Event.associate = function(models) {
    Event.belongsTo(models.Block, { foreignKey: "number", targetKey: "number", as: "block" });
  };

  return Event;
};
