const Common = require('./Common')
const Chat = require('../controllers/chat.controller')
exports.ListenMigrateToChat = (bot,ctx)=> {
    try {
        const request = {
            chat_id: ctx.chat.id,
            type: "moved",
            is_active: 0
        }
        Chat.updateForMigrate(request)
            .catch(err => {
                console.log(err);
            })
    }catch(e){
        console.log(e);
    }
}

exports.ListenMigrateFromChat = (bot,ctx)=> {
    try {
        const request = {
            chat_id: ctx.chat.id,
            type: ctx.chat.type,
            group_name: ctx.chat.title,
            old_id: ctx.message.migrate_from_chat_id
        }
        Chat.create(request)
            .catch(err => {
                console.log(err);
            })
    }catch (e) {
        console.log(e);
    }
}

exports.chatCreated = async (bot, ctx) =>{
    try {
        const chat_id = ctx.chat.id;
        const user_id = ctx.from.id;
        const chatMember = await bot.telegram.getChatMember(chat_id, user_id);
        const request = {
            chat_id: chat_id,
            user_id: user_id,
            type: ctx.chat.type,
            first_name: ctx.message.from.first_name,
            last_name: ctx.message.from.last_name,
            user_name: ctx.message.from.username,
            group_name: ctx.chat.title,
            status: chatMember.status
        }
        Common.chatAndUserCreate(request)
            .catch((err) => {
                console.log(err)
            })
    }catch (e) {
        console.log(e)
    }
}
