const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerDoc = require('./public/swaggerDoc');
const optionsRouter = require('./routes/options');
const messageRouter = require('./routes/message')
const roomsRouter = require('./routes/rooms')
const usersRouter = require('./routes/user');

const { sequelize } = require('./models');

sequelize.sync();

const app = express();

swaggerDoc(app);

/**
 * 파일 or 데이터베이스에 로그를 남기고 싶다면 wiston 모듈을 찾아 보도록 하자.
 */
app.use(logger('dev')); //  dev must change to < common or combine > when 배포
app.use(express.json());    // it can do post request ( because it is include body-parser )
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);
app.use('/options', optionsRouter);
app.use('/messages', messageRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

/**
 * For Telegram bot Hook
 */

const { Telegraf } = require('telegraf');
const bot = new Telegraf(require('./config/botkey.json').test_botKey);
const bot_id = require('./config/botkey.json').test_botID;

/**
 * bot.on('text')보완할 수 있는 방법.
 */

// bot.context.restrictedWords = {
//     getRestrictWords: () => { return [{word:"kyeong"}, {word:"kyeong2"}] }
// }
// const scores = bot.context.restrictedWords.getRestrictWords();
// console.log("socres -> " ,scores)
// scores.some(
//     score=>{
//         console.log(score)
//     bot.hears(score.word, ctx=>{
//         console.log("qwerqwer")
//     })
//     }
// )

bot.on('channel_post', ctx=>{
    console.log("channel_post -> " , ctx.update.channel_post.text);
})

bot.on('edited_channel_post', ctx=>{
    console.log("edited_channel_post -> " ,ctx.update.channel_post.text);
})
const emojiRegex = require('emoji-regex')
const Blacklist = require('./controllers/chat_blacklist.controller')
const Whitelist = require('./controllers/user_chat_whitelist')
const Message = require('./controllers/message.controller')
const Chat = require('./controllers/chat.controller')
const User = require('./controllers/user.controller')
const User_chat = require('./controllers/user_chat_personal')

// const regex = emojiRegex();

//<editor-fold desc=" Listener left & join member">

bot.on("new_chat_members", async ctx=>{
    const users = ctx.message.new_chat_members;
    users.some(
        user=>{
            const request = {
                user_id : user.id,
                chat_id : ctx.chat.id,
                first_name: user.first_name,
                last_name: user.last_name,
                user_name: user.username,
                is_bot: user.is_bot,
                message_id: ctx.message.message_id,
                message_type: 'join_chat',
                type: 'group',
                group_name : ctx.chat.title
            }
            if(user.id === bot_id){
                Chat.createOrUpdate(request)
            }
            User.updateOrCreate(request)
                .then( () =>{
                    User_chat.findOrCreate(request)
                        .then(()=>{
                            Message.create(request)
                        })
                })
                .catch()
        }
    )
});

/**
 * Listener left member ( after Need to bot )
 * Step
 * 0. check this chat's creatorId===left member's id
 * 1. if user already exists update or not create user
 * 2. if User_chat don't exists create user_chat
 * 3.
 */
bot.on('left_chat_member', async ctx=>{
    const user = ctx.message.left_chat_member;
    const request = {
        user_id : user.id,
        chat_id : ctx.chat.id,
        message_id: ctx.message.message_id,
        message_type: 'left_chat'
    }
    let flag = false;
    await Chat.findByChat(request)
        .then((result)=>{
            if(result.user_id === request.user_id) flag = true;
        })
        .catch((err)=>{
        })
    if(request.user_id === bot_id || flag){
        Chat.delete(request)
            .then();
    }
    Message.create(request)
        .then();
})
//</editor-fold>

//<editor-fold desc="Listener user messaging">

bot.on("sticker", async ctx=>{
})

/**
 * Listener Text
 * Message Type: 'text' & if black word -> change 'delete'
 * - Accept White User & BlackList User & Store Message
 * ( * Consider emoji && Ban or Time Restriction )
 */
bot.on('text',  async ctx => {
    // let match;
    // while (match = regex.exec(ctx.message.text)) {
    //     const emoji = match[0];
    //     const emojiiin = emoji.codePointAt(0);
    //     console.log(emojiiin);
    //     console.log(String.fromCodePoint(emojiiin))
    //     ctx.message.text.replace(emoji,"sad");
    // }
    let request = {
        chat_id : ctx.chat.id,
        user_id : ctx.from.id,
        message_id : ctx.message.message_id,
        message_type : ctx.message.reply_to_message ? "reply" : "text",
        message :  ctx.message.text,
        reply_to_message_id : ctx.message.reply_to_message !== undefined ? ctx.message.reply_to_message.message_id : null,
        entity : ctx.message.entities
    }
    await checkAndCreateUser(ctx.from, ctx)

    if(request.entity !== undefined){
        request.message_type = "entity_text"
    }
    try{
        const whiteUser = (await Whitelist.findByChatIdUserId(request));
        if(whiteUser === null){
            const words = (await Blacklist.findByChatId(request));
            if(words!==undefined) {
                words.some(
                    word => {
                        if (ctx.message.text.includes(word.word)) {
                            bot.telegram.deleteMessage(request.chat_id, ctx.update.message.message_id)
                                .then(() => {
                                    request.message_type = "delete"
                                })
                                .catch(() => {
                                })
                            return true;
                        }
                    }
                )
            }
        }
        Message.create(request)
            .then(()=>{
            })
            .catch((err)=>{
                console.log(err)
            })
    }catch (err) {
        console.log(err)

    }
})
//</editor-fold>

bot.launch();
module.exports = app;
