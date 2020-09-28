const Common = require('./Common')
const Chat = require('./controllers/chat.controller')
exports.ListenChatCreated = bot=> {
    bot.on("migrate_to_chat_id", async ctx=> {
        const request = {
            chat_id : ctx.chat.id,
            type: "moved",
            is_active: 0
        }
        Chat.updateForMigrate(request)
            .catch(err =>{
                console.log(err);
            })
    });
    bot.on('migrate_from_chat_id', ctx=>{
        const request = {
            chat_id: ctx.chat.id,
            type: ctx.chat.type,
            group_name: ctx.chat.title,
            user_id: ctx.from.id,
            old_id: ctx.message.migrate_from_chat_id
        }
        Chat.create(request)
            .catch(err =>{
                console.log(err);
            })
    });
    bot.on('supergroup_chat_created', async ctx=>{
        const chat_id= ctx.chat.id;
        const user_id= ctx.from.id;
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
            .catch((err)=>{
                console.log(err)
            })
    });

    bot.on('channel_chat_created', async ctx=>{
        const chat_id= ctx.chat.id;
        const user_id= ctx.from.id;
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
            .catch((err)=>{
                console.log(err)
            })
    });

    bot.on('group_chat_created',  async ctx=>{
        const chat_id= ctx.chat.id;
        const user_id= ctx.from.id;
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
             .catch((err)=>{
                 console.log(err)
             })
    });
}
