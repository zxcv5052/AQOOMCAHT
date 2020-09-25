const Common = require('./Common')
const blackListWord = require('./controllers/chat_blacklist.controller');
const whiteListUser = require('./controllers/user_chat_whitelist');
exports.ListenText = bot =>{
    bot.on('text', async ctx =>{
        const chat_id = ctx.message.chat.id;
        const user_id = ctx.message.from.id;
        const chatMember = await bot.telegram.getChatMember(chat_id, user_id);
        const request = {
            chat_id: chat_id,
            user_id: user_id,
            first_name: ctx.message.from.first_name,
            last_name: ctx.message.from.last_name,
            user_name: ctx.message.from.username,
            language_code: ctx.message.from.language_code,
            status : chatMember.status,
            message_id: ctx.message.message_id,
            message_type: ctx.message.reply_to_message ? "reply" : "text",
            message : ctx.message.text,
            entity : ctx.message.entity,
            reply_to_message_id : ctx.message.reply_to_message_id
        }
        await Common.checkAndCreateUser(request);
        const whiteUser = await whiteListUser.findByChatUser(request);

        await (async function (){
            if(whiteUser === null){
                const blackWords = await blackListWord.findByChatId(request);
                if (blackWords.length !== 0) {
                    blackWords.some(
                        blackWord => {
                            if (request.message.includes(blackWord.word)) {
                                request.message_type = 'bot_delete';
                                bot.telegram.deleteMessage(request.chat_id, request.message_id)
                                    .then(() => {
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })
                                return true;
                            }
                        });
                }
            }
        })();
        await Common.saveMessage(request);
    });
}