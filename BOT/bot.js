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
    await chatRoom.ListenMigrateFromChat(bot, ctx);
})
bot.on('migrate_to_chat_id', async ctx=> {
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

//<editor-fold desc="Not Private Send Message">
bot.on('sticker', async ctx =>{
    if(ctx.chat.type !== 'private') await message.ListenSticker(bot, ctx);
});
bot.on('animation', async ctx=> {
    if(ctx.chat.type !== 'private') await message.ListenAnimation(bot, ctx);
});
bot.on('text', async ctx =>{
    if(ctx.chat.type !== 'private') await message.ListenText(bot, ctx);
});
bot.on('photo', async ctx=>{
    if(ctx.chat.type !== 'private') await message.ListenPhoto(bot,ctx);
});
bot.on('document' , async  ctx=>{
    if(ctx.chat.type !== 'private') await message.ListenDocument(bot,ctx);
});
bot.on('video', async ctx=>{
    if(ctx.chat.type !== 'private') await message.ListenVideo(bot,ctx);
});
bot.on('video_note', async ctx=>{
    if(ctx.chat.type !== 'private') await message.ListenVideoNote(bot,ctx);
})
bot.on('location', async ctx=>{
    if(ctx.chat.type !== 'private') await message.ListenLocation(bot,ctx);
})
bot.on('voice', async ctx=>{
    if(ctx.chat.type !== 'private') await message.ListenVoice(bot,ctx);
});
// 구현 미완성.
bot.on('invoice', async ctx=>{
    console.log('in voice');
    console.log(ctx.message);
});
// 구현 미완성.
bot.on('successful_payment', async ctx=>{
    console.log(ctx.message);
});
bot.on('audio', async ctx=>{
    if(ctx.chat.type !== 'private') await message.ListenAudio(bot,ctx);
});
//</editor-fold>

bot.launch();