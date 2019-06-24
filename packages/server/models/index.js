"use strict";

const fs = require("fs");
const path = require("path");
require("pg").defaults.parseInt8 = true;
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

// TODO: 可在适当位置对这些环境变量做检查，没有设置或不符合要求提示信息
Object.assign(config, {
  host: "pgm-bp15ge027b8034f1eo.pg.rds.aliyuncs.com",
  port: "3432",
  username: "chainx",
  password: "ChainXorg123"
});

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach(file => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
