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

bot.on('text',  async ctx => {
    const request = {
        chat_id: ctx.chat.id
    }
    // try{
    //     const words = (await restriction_words.findByChatId(request));
    //     words.some(
    //         word=> {
    //             console.log(word);
    //             if(ctx.message.text.includes(word.word_name)){
    //                 bot.telegram.deleteMessage(request.chat_id, ctx.update.message.message_id)
    //                     .then(result =>{
    //                     })
    //                     .catch(err =>{
    //                     })
    //                 return true;
    //             }
    //         }
    //     )
    // }catch (err) {
    //
    // }
})
bot.launch();
module.exports = app;
