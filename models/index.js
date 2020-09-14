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

/**
 * SET Models
 */
db.chat = require("./Chat")(sequelize, Sequelize);
db.users = require("./users")(sequelize,Sequelize);
db.whitelist_urls = require("./whitelist_urls")(sequelize, Sequelize);
db.restriction_words = require("./restriction_words")(sequelize, Sequelize);
db.whitelist_users = require("./whitelist_users")(sequelize,Sequelize);

/**
 * SET relation
 */
db.whitelist_urls.belongsTo(db.chat, {
    foreignKey: "chat_id",
    as: "chat"
})
db.restriction_words.belongsTo(db.chat, {
  foreignKey: "chat_id",
  as: "chat",
});

db.whitelist_users.belongsTo(db.chat, {
    foreignKey: "chat_id",
    as: "chat",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
