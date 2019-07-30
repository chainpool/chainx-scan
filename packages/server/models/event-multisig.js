"use strict";
module.exports = (sequelize, DataTypes) => {
  const EventMultiSig = sequelize.define(
    "EventMultiSig",
    {
      multisigid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      addr: {
        type: DataTypes.STRING
      },
      accountid: {
        type: DataTypes.STRING
      },
      module: {
        type: DataTypes.STRING
      },
      call: {
        type: DataTypes.STRING
      },
      confirm_tx: {
        type: DataTypes.STRING
      },
      args: {
        type: DataTypes.TEXT
      },
      yet_needed: {
        type: DataTypes.BIGINT
      },
      owners_done: {
        type: DataTypes.BIGINT
      },
      height: {
        type: DataTypes.BIGINT
      },
      txid: {
        type: DataTypes.STRING,
        primaryKey: true
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "event_multisig"
    }
  );

  EventMultiSig.associate = function(models) {
    EventMultiSig.belongsTo(models.Block, { foreignKey: "height", targetKey: "number", as: "block" });
  };

  return EventMultiSig;
};
