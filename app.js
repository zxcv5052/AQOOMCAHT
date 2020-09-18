const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const optionsRouter = require('./routes/options');
const accumulationsRouter = require('./routes/accumaltions')
const roomsRouter = require('./routes/rooms')
const usersRouter = require('./routes/users');

const { sequelize } = require('./models');
sequelize.sync();

const app = express();


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
app.use('/accumulations', accumulationsRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

/**
 * For Telegram bot Hook
 */

const { Telegraf } = require('telegraf')
const bot = new Telegraf(require('./config/botkey.json').test_botKey)

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
    console.log("asdfzxcv");
    console.log(ctx.update.channel_post.text);
})

bot.use((ctx,next)=>{
    return next();
})

bot.on('edited_channel_post', ctx=>{
    console.log("qwerqwer")
    console.log(ctx.update.channel_post.text);
})
const emojiRegex = require('emoji-regex')
const Blacklist = require('./controllers/chat_blacklist.controller')
const Whitelist = require('./controllers/user_chat_whitelist')
const Message = require('./controllers/message.controller')
const Chat = require('./controllers/chat.controller')
const User = require('./controllers/user.controller')
const User_chat = require('./controllers/user_chat_personal')

// const regex = emojiRegex();

/**
 * Listener user create chat when inviting bot
 * Step
 * 1. create chat_room
 * 2. if user already exists update user or not create user
 * 3. if user_chat already exists finish or not create user_chat
 */
function chatCreate(request, type){
    let _request = {
        chat_id: request.chat.id,
        user_id: request.from.id,
        type: type,
        first_name: request.message.from.first_name,
        last_name: request.message.from.last_name,
        user_name: request.message.from.username,
        group_name: request.chat.title,
        is_admin: true
    }
    Chat.create(_request)
        .then( ()=>{
            User.updateOrCreate(_request)
                .then( ()=>{
                    User_chat.findOrCreate(_request)
                        .then(()=>{
                            return true;
                        })
                        .catch(()=>{
                            return false;
                        })
                })
        })
        .catch( ()=>{
            return false;
            // slack or announce for developer
        })
}

//<editor-fold desc="Listener creating chat">
bot.on('supergroup_chat_created', ctx=>{
    chatCreate(ctx, 'supergroup');
});
bot.on('channel_chat_created',  ctx=>{
    chatCreate(ctx, 'channel');
});
bot.on('group_chat_created',  ctx=>{
    chatCreate(ctx, 'group');
});
//</editor-fold>

/**
 * Listener join member ( after Need to bot )
 * Step
 * 1. if user already exists update or not create user
 * 2. if User_chat don't exists create user_chat
 * 3.
 */
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
                message_type: 'join_chat'
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
 * 1. if user already exists update or not create user
 * 2. if User_chat don't exists create user_chat
 * 3.
 */
bot.on('left_chat_member', ctx=>{
    const user = ctx.message.left_chat_member;

    const request = {
        user_id : user.id,
        chat_id : ctx.chat.id,
        message_id: ctx.message.message_id,
        message_type: 'left_chat'
    }
    Message.create(request)
})

//<editor-fold desc="Listener user messaging">

bot.on("sticker", async ctx=>{
    console.log(ctx.message)
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
        reply_to_message_id : ctx.message.reply_to_message !== undefined ? ctx.message.reply_to_message.message_id : null
    }
    try{
        const whiteUser = (await Whitelist.findByChatIdUserId(request));
        if(whiteUser === null){
            const words = (await Blacklist.findByChatId(request));
            words.some(
                word=> {
                    if(ctx.message.text.includes(word.word)){
                        bot.telegram.deleteMessage(request.chat_id, ctx.update.message.message_id)
                            .then(() =>{
                                request.message_type = "delete"
                            })
                            .catch(() =>{
                            })
                        return true;
                    }
                }
            )
        }
        Message.create(request)
            .then(()=>{
            })
            .catch((err)=>{
            })
    }catch (err) {

    }
})

//</editor-fold>

bot.launch();
module.exports = app;
