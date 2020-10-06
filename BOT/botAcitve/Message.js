const Common = require('./Common');

const FAQ = require('./DefaultFAQ');
const Chat = require('../controllers/chat.controller');
const BlackListWord = require('../controllers/chat_blacklist.controller');
const WhiteListUser = require('../controllers/user_chat_whitelist');
const UserChatList = require('../controllers/user_chat_personal');

// URL & Forward && <Command?>
exports.ListenText = async (bot,ctx) =>{
    const messageText = ctx.message.text;
    const originalChatId = ctx.message.chat.id;
    const user_id = ctx.message.from.id;
    const chatMember = await bot.telegram.getChatMember(originalChatId, user_id);

    let request = await makeRequest(ctx, messageText, chatMember);

    request['message_type'] = ctx.message.reply_to_message ? "reply_to_text" : "text";
    request['message_type'] = ctx.message.forward_from === undefined ? request.message_type : "forward_text";
    request['is_forward'] = ctx.message.forward_from !== undefined;

    if(ctx.message.entities !== undefined) request["entity"] = JSON.stringify(ctx.message.entities);

    const chatRules = await Chat.findByChat(request);

    // FAQ Function
    await async function (){
        if(ctx.message.text.indexOf('!') === 0){
            request['chat_type'] = ctx.chat.type;
            const isFAQ = await FAQ.customAndDefaultFAQ(request, ctx, chatRules, originalChatId, bot);
            if(isFAQ) request['message_type'] = 'call_faq';
        }
    }();

    await Common.chatAndUserCreate(request);
    request = await checkRestriction(request, ctx, originalChatId, chatRules, bot);
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
        request['message_type'] = ctx.message.forward_from === undefined ? request.message_type : "forward_sticker";

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

        const request = await makeRequest(ctx, getFileID, chatMember);

        request['message_type'] = ctx.message.reply_to_message ? "reply_to_photo" : "photo";
        request['message_type'] = ctx.message.forward_from === undefined ? request.message_type : "forward_photo";

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

        const request = await makeRequest(ctx, getFileID, chatMember);

        request['message_type'] = ctx.message.reply_to_message ? "reply_to_document" : "document";
        request['message_type'] = ctx.message.forward_from === undefined ? request.message_type : "forward_document";

        if(ctx.message.caption !== undefined) request['entity'] = ctx.message.caption;

        await Common.chatAndUserCreate(request);

        await Common.saveMessage(request);
    }catch (e) {
        console.log(e);
    }
}

exports.ListenVideo = async (bot, ctx) => {
    try{
        const getFileID = ctx.message.video.file_id;
        const originalChatId = ctx.message.chat.id;
        const user_id = ctx.message.from.id;
        const chatMember = await bot.telegram.getChatMember(originalChatId, user_id);

        const request = await makeRequest(ctx, getFileID, chatMember);

        request['message_type'] = ctx.message.reply_to_message ? "reply_to_video" : "video";
        request['message_type'] = ctx.message.forward_from === undefined ? request.message_type : "forward_video";

        if(ctx.message.media_group_id !== undefined) request['media_group_id'] = ctx.message.media_group_id;

        if(ctx.message.caption !== undefined) request['entity'] = ctx.message.caption;

        await Common.chatAndUserCreate(request);

        await Common.saveMessage(request);
    }catch (e) {
        console.log(e)
    }
}
exports.ListenVideoNote = async (bot, ctx) => {
    console.log(ctx.message);
    try{
        // const getFileID = ctx.message.video.file_id;
        // const originalChatId = ctx.message.chat.id;
        // const user_id = ctx.message.from.id;
        // const chatMember = await bot.telegram.getChatMember(originalChatId, user_id);
        //
        // const request = await makeRequest(ctx, getFileID, chatMember);
        //
        // request['message_type'] = ctx.message.reply_to_message ? "reply_to_video" : "video";
        //
        // if(ctx.message.media_group_id !== undefined) request['media_group_id'] = ctx.message.media_group_id;
        //
        // if(ctx.message.caption !== undefined) request['entity'] = ctx.message.caption;
        //
        // await Common.chatAndUserCreate(request);
        //
        // await Common.saveMessage(request);
    }catch (e) {
        console.log(e)
    }
}
exports.ListenVoice = async (bot, ctx) => {
    try{
        const getFileID = ctx.message.voice.file_id;
        const originalChatId = ctx.message.chat.id;
        const user_id = ctx.message.from.id;
        const chatMember = await bot.telegram.getChatMember(originalChatId, user_id);

        const request = await makeRequest(ctx, getFileID, chatMember);

        request['message_type'] = ctx.message.reply_to_message ? "reply_to_voice" : "voice";

        await Common.chatAndUserCreate(request);

        await Common.saveMessage(request);
    }catch (e) {
        console.log(e)
    }
}
exports.ListenLocation = async (bot, ctx) => {
    try{
        const getFileID = JSON.stringify(ctx.message.location);
        const originalChatId = ctx.message.chat.id;
        const user_id = ctx.message.from.id;
        const chatMember = await bot.telegram.getChatMember(originalChatId, user_id);

        const request = await makeRequest(ctx, getFileID, chatMember);

        request['message_type'] = ctx.message.reply_to_message ? "reply_to_location" : "location";

        await Common.chatAndUserCreate(request);

        await Common.saveMessage(request);
    }catch (e) {
        console.log(e)
    }
}
exports.ListenAnimation = async (bot, ctx) => {
    try{
        const getFileID = ctx.message.animation.file_id;
        const originalChatId = ctx.message.chat.id;
        const user_id = ctx.message.from.id;
        const chatMember = await bot.telegram.getChatMember(originalChatId, user_id);

        const request = await makeRequest(ctx, getFileID, chatMember);

        request['message_type'] = ctx.message.reply_to_message ? "reply_to_animation" : "animation";

        await Common.chatAndUserCreate(request);

        await Common.saveMessage(request);
    }catch (e) {
        console.log(e)
    }
}
exports.ListenAudio = async (bot, ctx) => {
    try{
        const getFileID = ctx.message.audio.file_id;
        const originalChatId = ctx.message.chat.id;
        const user_id = ctx.message.from.id;
        const chatMember = await bot.telegram.getChatMember(originalChatId, user_id);

        const request = await makeRequest(ctx, getFileID, chatMember);

        request['message_type'] = ctx.message.reply_to_message ? "reply_to_audio" : "audio";

        request['entity'] = ctx.audio.title;

        await Common.chatAndUserCreate(request);

        await Common.saveMessage(request);
    }catch (e) {
        console.log(e)
    }
}
async function makeRequest(ctx, messageValue, chatMember){
    try{
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
async function checkRestriction(request, ctx, originalChatId, chatRules , bot) {
    const whiteUser = await WhiteListUser.findByChatUser(request);
    if (whiteUser === null) {
        // Forward Checking
        if(chatRules.anti_forward && request.is_forward) {
            request.message_type = 'bot_delete';
            await bot.telegram.deleteMessage(originalChatId, request.message_id)
                .then(async () => {
                    ctx.reply("Forward 사용");
                    if(request.status === 'member' && chatRules.restrict_type !== 'none')
                        await UserChatList.updateToRestriction(request, originalChatId,chatRules, bot);
                })
                .catch((err) => {
                    console.log(err);
                })
            return request;
        }
        if(request.message_type === 'text' || request.message_type === 'reply_text' || request.message_type === 'forward_text'){
            // Black List word Process
            const blackWords = await BlackListWord.findByChatId(request);
            if (blackWords.length !== 0) {
                await blackWords.some(
                    blackWord => {
                        if (request.message.includes(blackWord.word)) {
                            request.message_type = 'bot_delete';
                            bot.telegram.deleteMessage(originalChatId, request.message_id)
                                .then(() => {
                                    ctx.reply("금지어 사용");
                                    if(request.status === 'member' && chatRules.restrict_type !== 'none')
                                        UserChatList.updateToRestriction(request, originalChatId, chatRules, bot);
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                            return request;
                        }
                    });
            }
            // anti_url
            if(request.anti_url){
                ctx.message.entities.some(
                    entity =>{
                        if(entity.type === 'url'){
                            request.message_type = 'bot_delete';
                            bot.telegram.deleteMessage(originalChatId, request.message_id)
                                .then(()=>{
                                    ctx.reply("URL 사용");
                                    if(request.status === 'member' && chatRules.restrict_type !== 'none')
                                        UserChatList.updateToRestriction(request, originalChatId, chatRules, bot);
                                })
                            return request;
                        }
                    }
                )
            }
        }
    }
    return request;
}