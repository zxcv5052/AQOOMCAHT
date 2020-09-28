const { sequelize } = require('./models');
const { Telegraf } = require('telegraf');
const chatRoom = require('./botAcitve/CreateChat.js')
const user = require('./botAcitve/UserJoinLeft.js')
const message = require('./botAcitve/Message.js')
const bot = new Telegraf(require('./config/botkey.json').test_botKey);

sequelize.sync();
// const slackCommand = require('./slack');
// slackCommand.slackSend("test");
chatRoom.ListenChatCreated(bot);
user.userJoinOrLeft(bot);
message.ListenText(bot);
bot.launch();