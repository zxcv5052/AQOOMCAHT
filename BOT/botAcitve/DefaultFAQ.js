
const moment = require('moment')
const FAQ = require('../controllers/chat_FAQ')
const BlackList = require('../controllers/chat_blacklist.controller')

exports.customAndDefaultFAQ = async (request, ctx, chatRules, originalChatId, bot) => {
    if(request.message === '!rule'){
        const blackList = await BlackList.findByChatId(request);
        if(blackList.length !== 0){
            await blackList.some(
                word =>{
                    ctx.reply(`black Words : ${word.word}`);
                }
            )
        }else{
            ctx.reply('룰이 존재 하지 않습니다.')
        }
        return true;
    }

    if(request.status !== 'member'){
        const _until_date = moment().add(chatRules.restrict_time,'minutes').unix();

        if(request.message.indexOf('!unban')===0 && request.chat_type === 'supergroup'){
            if(ctx.message.entities !== undefined){
                await ctx.message.entities.some(
                    async entity =>{
                       if(entity.type === 'text_mention')
                            await bot.telegram.unbanChatMember(originalChatId, entity.user.id)
                                 .then(()=>{
                                     return true;
                                 })
                                .catch(err=>{
                                    console.log(err);
                                })
                    }
                )
            }
            return false;
        }
        if(request.message.indexOf('!ban') === 0 && request.chat_type === 'supergroup'){
            if(ctx.message.entities !== undefined) {
                await ctx.message.entities.some(
                    async entity => {
                        if(entity.type === 'text_mention')
                            await bot.telegram.kickChatMember(originalChatId, entity.user.id, _until_date)
                                .then(()=>{
                                    return true;
                                })
                                .catch(err=>{
                                    console.log(err);
                                })
                    }
                )
            }
            return false;
        }
        if(request.message.indexOf('!kick')===0 && request.chat_type === 'supergroup'){
            if(ctx.message.entities !== undefined) {
                await ctx.message.entities.some(
                    async entity => {
                        if(entity.type === 'text_mention')
                            await bot.telegram.kickChatMember(originalChatId, entity.user.id)
                                .then(()=>{
                                    return true;
                                })
                                .catch(err=>{
                                    console.log(err);
                                })
                    }
                )
            }
            return false;
        }
    }
}