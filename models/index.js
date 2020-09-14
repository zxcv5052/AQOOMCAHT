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
db.Chat = require("./Chat")(sequelize, Sequelize);
db.Message = require("./Message")(sequelize,Sequelize);
db.User = require("./User")(sequelize,Sequelize);

/**
 * SET relation
 */
db.Message.belongsTo(db.Chat, {
    foreignKey: "chat_id",
    as: "Chat"
})
db.Message.belongsTo(db.User, {
  foreignKey: "user_id",
  as: "User",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
