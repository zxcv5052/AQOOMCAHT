const { sequelize } = require('./models');
const { Telegraf } = require('telegraf');
const chatRoom = require('./botAcitve/CreateChat.js')
const user = require('./botAcitve/UserJoinLeft.js')
const message = require('./botAcitve/Message.js')
const bot = new Telegraf(require('./config/botkey.json').test_botKey);

sequelize.sync();
// const slackCommand = require('./slack');
// slackCommand.slackSend("test");


//<editor-fold desc="Chat Listener">
bot.on('migrate_from_chat_id', async ctx=> {
    console.log(ctx.message);
    await chatRoom.ListenMigrateFromChat(bot, ctx);
})
bot.on('migrate_to_chat_id', async ctx=> {
    console.log(ctx.message);
    await chatRoom.ListenMigrateToChat(bot, ctx);
})
bot.on('channel_chat_created', async ctx =>{
    await chatRoom.chatCreated(bot, ctx)
})
bot.on('group_chat_created', async ctx =>{
    await chatRoom.chatCreated(bot, ctx)
})
bot.on('supergroup_chat_created', async ctx =>{
    await chatRoom.chatCreated(bot, ctx)
})
//</editor-fold>


//<editor-fold desc="User Join & Left Listener">
bot.on('left_chat_member', async ctx => {
    if(ctx.chat.type !== 'private') await user.ListenUserLeftChat(bot,ctx)
});
bot.on('new_chat_members', async ctx => {
    if(ctx.chat.type !== 'private') await user.ListenUserJoinChat(bot,ctx)
});
//</editor-fold>

bot.on('sticker', async ctx =>{
    if(ctx.chat.type !== 'private') await message.ListenSticker(bot, ctx);
});

bot.on('animation', async ctx=> {
    console.log(ctx.message)
});

bot.on('text', async ctx =>{
    if(ctx.chat.type !== 'private') await message.ListenText(bot, ctx);
});

bot.launch();