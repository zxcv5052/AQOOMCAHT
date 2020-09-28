const Common = require('./Common')
const FAQ = require('./DefaultFAQ');
const Chat = require('../controllers/chat.controller');
const BlackListWord = require('../controllers/chat_blacklist.controller');
const WhiteListUser = require('../controllers/user_chat_whitelist');
const UserChatList = require('../controllers/user_chat_personal')
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
            reply_to_message_id : ctx.message.reply_to_message_id
        };
        if(ctx.message.entities !== undefined){
            request["entity"] = ctx.message.entities.toString();
        }
        await FAQ.defaultFAQ(request, ctx.message, bot);

        // Check It is Moved Chat Room
        const chat = await Chat.findByChat(request);
        request["chat_id"] = chat.old_id !== null ? chat.old_id : chat_id;

        await Common.chatAndUserCreate(request);
        const whiteUser = await WhiteListUser.findByChatUser(request);

        await (async function (){
            if(whiteUser === null || chat.user_id !== user_id){
                const blackWords = await BlackListWord.findByChatId(request);
                if (blackWords.length !== 0) {
                    blackWords.some(
                        blackWord => {
                            if (request.message.includes(blackWord.word)) {
                                request.message_type = 'bot_delete';
                                bot.telegram.deleteMessage(chat_id, request.message_id)
                                    .then(async () => {
                                        await UserChatList.updateToRestriction(request, chat_id, bot);
                                        ctx.reply("금지어 사용");
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