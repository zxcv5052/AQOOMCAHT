const Common = require('./Common')
exports.ListenChatCreated = bot=> {
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
        Common.chatCreate(request)
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
        Common.chatCreate(request)
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
         Common.chatCreate(request)
             .catch((err)=>{
                 console.log(err)
             })
    });
}
