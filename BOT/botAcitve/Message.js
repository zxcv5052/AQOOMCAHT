const Common = require('./Common');

const FAQ = require('./DefaultFAQ');
const Chat = require('../controllers/chat.controller');
const BlackListWord = require('../controllers/chat_blacklist.controller');
const WhiteListUser = require('../controllers/user_chat_whitelist');
const UserChatList = require('../controllers/user_chat_personal');

exports.ListenText = async (bot,ctx) =>{
    const messageText = ctx.message.text;

    const originalChatId = ctx.message.chat.id;
    const user_id = ctx.message.from.id;
    const chatMember = await bot.telegram.getChatMember(originalChatId, user_id);

    const request = await makeRequest(ctx, messageText, chatMember);

    request['message_type'] = ctx.message.reply_to_message ? "reply_to_text" : "text";

    if(ctx.message.entities !== undefined) request["entity"] = JSON.stringify(ctx.message.entities);

    const chatRules = await Chat.findByChat(request);

    await async function (){
        if(ctx.message.text.indexOf('!') === 0){
            request['chat_type'] = ctx.chat.type;
            const isFAQ = await FAQ.customAndDefaultFAQ(request, ctx, chatRules, originalChatId, bot);
            if(isFAQ) request['message_type'] = 'call_faq';
        }
    }();

    await Common.chatAndUserCreate(request);    // 꼭 필요 한가? ( Chat 은 오바 인가? )

    //<editor-fold desc="Check Rules <Black Word & White User>">
    if(chatMember.status !== 'creator'){
        const whiteUser = await WhiteListUser.findByChatUser(request);

        await (async function () {
            if (whiteUser === null) {
                const blackWords = await BlackListWord.findByChatId(request);
                if (blackWords.length !== 0) {
                    blackWords.some(
                        blackWord => {
                            if (request.message.includes(blackWord.word)) {
                                request.message_type = 'bot_delete';
                                bot.telegram.deleteMessage(originalChatId, request.message_id)
                                    .then(async () => {
                                        ctx.reply("금지어 사용");
                                        await UserChatList.updateToRestriction(request, originalChatId,chatRules, bot);
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
    }
        //</editor-fold>

        await Common.saveMessage(request);
}

exports.ListenSticker = async (bot,ctx) =>{
    try {
        const getFileID = ctx.message.sticker.file_id;

        const originalChatId = ctx.message.chat.id;
        const user_id = ctx.message.from.id;
        const chatMember = await bot.telegram.getChatMember(originalChatId, user_id);

        const request = await makeRequest(ctx, getFileID, chatMember);

        request['message_type'] = ctx.message.reply_to_message ? "reply_to_sticker" : "sticker";

        await Common.chatAndUserCreate(request);

        await Common.saveMessage(request);
    }catch (e) {
        console.log(e)
    }
};
exports.ListenPhoto = async (bot, ctx) =>{
    try{
        const getFileID = ctx.message.photo[0].file_id;

        const originalChatId = ctx.message.chat.id;
        const user_id = ctx.message.from.id;
        const chatMember = await bot.telegram.getChatMember(originalChatId, user_id);

        const request = await makeRequest(ctx, getFileID, chatMember, 'photo');

        request['message_type'] = ctx.message.reply_to_message ? "reply_to_photo" : "photo";

        if(ctx.message.media_group_id !== undefined) request['media_group_id'] = ctx.message.media_group_id;

        if(ctx.message.caption !== undefined) request['entity'] = ctx.message.caption;

        await Common.chatAndUserCreate(request);

        await Common.saveMessage(request);
    }catch (e) {
        console.log(e);
    }
};
exports.ListenDocument = async (bot, ctx) => {
    try{
        // getFileID => ctx.message.document.thumb.file_id ? 둘 중에 하나 선택 해야됨.
        const getFileID = ctx.message.document.file_id;
        const originalChatId = ctx.message.chat.id;
        const user_id = ctx.message.from.id;
        const chatMember = await bot.telegram.getChatMember(originalChatId, user_id);

        const request = await makeRequest(ctx, getFileID, chatMember, 'document');

        request['message_type'] = ctx.message.reply_to_message ? "reply_to_document" : "document";

        if(ctx.message.caption !== undefined) request['entity'] = ctx.message.caption;

        await Common.chatAndUserCreate(request);

        await Common.saveMessage(request);
    }catch (e) {
        console.log(e);
    }
}

exports.ListenVideo = async (bot, ctx) => {
    try{
        const getFileID = ctx.message.animation.file_id;
        const originalChatId = ctx.message.chat.id;
        const user_id = ctx.message.from.id;
        const chatMember = await bot.telegram.getChatMember(originalChatId, user_id);

        const request = await makeRequest(ctx, getFileID, chatMember, 'video');

        request['message_type'] = ctx.message.reply_to_message ? "reply_to_video" : "video";

        await Common.chatAndUserCreate(request);

        await Common.saveMessage(request);
    }catch (e) {
        console.log(e)
    }
}

async function makeRequest(ctx, messageValue, chatMember){
    try{
        // getFileID => ctx.message.document.thumb.file_id ? 둘 중에 하나 선택 해야됨.

        const originalChatId = ctx.message.chat.id;
        const user_id = ctx.message.from.id;

        const request = {
            message_id: ctx.message.message_id,
            message: messageValue,
            chat_id: ctx.chat.id,
            user_id: user_id,
            group_name: ctx.chat.title,
            reply_to_message_id : ctx.message.reply_to_message_id,
            first_name: ctx.message.from.first_name,
            last_name: ctx.message.from.last_name,
            user_name: ctx.message.from.username,
            language_code: ctx.message.from.language_code,
            status : chatMember.status==='restricted' ? "member" : chatMember.status,
            type: ctx.chat.type
        }

        // Check It is Moved Chat Room
        const thisChat = await Chat.findByChat(request);
        request["chat_id"] = thisChat.old_id !== null ? thisChat.old_id : originalChatId;

        return request;
    }catch (e) {
        console.log(e);
    }
}