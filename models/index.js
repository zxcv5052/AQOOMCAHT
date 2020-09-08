'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'test';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  operatorsAliases: 0
});

db.whitelist_urls = require("./whitelist_urls")(sequelize, Sequelize);
db.restriction_words = require("./restriction_words")(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
