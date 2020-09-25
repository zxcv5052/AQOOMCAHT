const { sequelize } = require('./models');
const { Telegraf } = require('telegraf');
const chatRoom = require('./CreateChat.js')
const user = require('./UserJoinLeft.js')
const message = require('./Message.js')
const bot = new Telegraf(require('./config/botkey.json').test_botKey);

sequelize.sync();
// const slackCommand = require('./slack');
// slackCommand.slackSend("test");
chatRoom.ListenChatCreated(bot);
user.userJoinOrLeft(bot);
message.ListenText(bot);

bot.launch();