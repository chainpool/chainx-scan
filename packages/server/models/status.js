"use strict";
module.exports = (sequelize, DataTypes) => {
  const Block = sequelize.define(
    "Status",
    {
      best: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      finalized: {
        type: DataTypes.BIGINT
      },
      transactions: {
        type: DataTypes.BIGINT
      },
      pcx_issuance: {
        type: DataTypes.BIGINT
      },
      pcx_destroy: {
        type: DataTypes.BIGINT
      },
      deposit_diff: {
        type: DataTypes.BIGINT
      },
      vote_diff: {
        type: DataTypes.BIGINT
      },
      validators: {
        type: DataTypes.BIGINT
      },
      votes: {
        type: DataTypes.BIGINT
      },
      dividend_cycle: {
        type: DataTypes.BIGINT
      },
      vote_cycle: {
        type: DataTypes.BIGINT
      },
      selfvote_count: {
        type: DataTypes.BIGINT
      },
      account_count: {
        type: DataTypes.BIGINT
      },
      btc_power: {
        type: DataTypes.BIGINT
      },
      sdot_power: {
        type: DataTypes.BIGINT
      },
      contract_count: {
        type: DataTypes.BIGINT
      },
      contract_call_count: {
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "status_chain"
    }
  );

  Block.associate = function(models) {
    // associations can be defined here
  };

  return Block;
};
