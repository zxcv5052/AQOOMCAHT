

const { Telegraf } = require('telegraf')

const bot = new Telegraf(require('./config/botkey.json').test_botKey);
const telegrafGetChatMembers = require('telegraf-getchatmembers');

const restriction_words = require('./controllers/restriction_words.controllers')

bot.use(telegrafGetChatMembers);

bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.command('modern', ({ reply }) => reply('Yo'))
bot.command('hipster', Telegraf.reply('λ'))

bot.on('text',  async ctx => {
    try{
        let words = (await restriction_words.findByChatId(ctx.chat.id));
        if(words !== undefined){
            bot.telegram.deleteMessage(ctx.chat.id, ctx.message.forward_from_message_id)
                .then();
        }
    }catch (err) {

    }
})
bot.launch();