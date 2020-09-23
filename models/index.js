'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'test';
const config = require(__dirname + '/../config/database.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    operatorsAliases: 0,
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    }
});

/**
 * SET Models
 */
db.Chat = require("./Chat")(sequelize, Sequelize);
db.Message = require("./Message")(sequelize,Sequelize);
db.User = require("./User")(sequelize,Sequelize);

db.Chat_announce = require("./Chat/Announce")(sequelize, Sequelize);
db.Chat_blacklist = require("./Chat/Blacklist")(sequelize, Sequelize);
db.Chat_FAQ = require("./Chat/FAQ")(sequelize, Sequelize);
db.Chat_greeting = require("./Chat/Greeting")(sequelize, Sequelize);
db.Chat_Timezone = require("./Chat/Timezone")(sequelize, Sequelize);
db.Chat_Bot_Acitivity = require('./Chat/Chat_Bot_Activity')(sequelize,Sequelize);

db.User_Chat_Personal = require('./User_Chat/User_Chat_Personal')(sequelize,Sequelize);
db.User_Chat_Whitelist = require('./User_Chat/User_Chat_Whitelist')(sequelize,Sequelize);
/**
 * SET Message Relation
 */
db.Message.belongsTo(db.Chat, {
    foreignKey: "chat_id",
});
db.Message.belongsTo(db.User, {
  foreignKey: "user_id",
});

/**
 * SET CHAT Relation
 */
db.Chat_blacklist.belongsTo(db.Chat, {
    foreignKey: "chat_id",
})
db.Chat_blacklist.uniqueKeys = {
    restriction_words_unique: {
        fields: ['word', 'chat_id']
    }
}

db.Chat_announce.belongsTo(db.Chat, {
    foreignKey: "chat_id",
})
db.Chat_Bot_Acitivity.belongsTo(db.Chat, {
    foreignKey: "chat_id",
})
db.Chat_FAQ.belongsTo(db.Chat, {
    foreignKey: "chat_id",
})
db.Chat_greeting.belongsTo(db.Chat, {
    foreignKey: "chat_id",
})
db.Chat_Timezone.belongsTo(db.Chat, {
    foreignKey: "chat_id",
})
/**
 * SET USER_CHAT Relation
 */
db.User_Chat_Personal.belongsTo(db.User,{
    foreignKey: "user_id",
});
db.User_Chat_Personal.belongsTo(db.Chat, {
    foreignKey: "chat_id",
});
db.User_Chat_Whitelist.belongsTo(db.User, {
    foreignKey: "user_id",
});
db.User_Chat_Whitelist.belongsTo(db.Chat, {
    foreignKey: "chat_id",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
