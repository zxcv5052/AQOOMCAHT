/**
 * Bot이 특정 단어를 듣게 될 때 쓴다. EX) !***
 * Default 종류
 *  - ban
 *  - unban
 * Custom 종류
 *  - DB에 있는 내용으로 변하면 된다.
 */
const moment = require('moment')
const FAQ = require('../controllers/chat_FAQ')
const BlackList = require('../controllers/chat_blacklist.controller')

exports.customAndDefaultFAQ = async (request, ctx, chatRules, originalChatId, bot) => {
    let flag = false;

    // 정제 할 필용가 있다.
    if(request.message === '!rule'){
        const blackList = await BlackList.findByChatId(request);
        if(blackList.length !== 0){
            blackList.some(
                word =>{
                    ctx.reply(`black Words : ${word.word}`);
                }
            )
        }
    }

    if(request.status !== 'member'){
        const _until_date = moment().add(chatRules.restrict_time,'minutes').unix();

        if(request.message.indexOf('!unban' && request.chat_type === 'supergroup') === 0){
            flag = true;
            if(ctx.message.entities !== undefined){
                ctx.message.entities.some(
                    async entity =>{
                       if(entity.type === 'text_mention')
                             bot.telegram.unbanChatMember(originalChatId, entity.user.id)
                                .catch(err=>{
                                    console.log(err);
                                })
                    }
                )
            }
            return flag;
        }
        if(request.message.indexOf('!ban' && request.chat_type === 'supergroup') === 0){
            flag = true;
            if(ctx.message.entities !== undefined) {
                ctx.message.entities.some(
                    async entity => {
                        if(entity.type === 'text_mention')
                            bot.telegram.kickChatMember(originalChatId, entity.user.id, _until_date)
                                .catch(err=>{
                                    console.log(err);
                                })
                    }
                )
            }
            return flag;
        }
        if(request.message.indexOf('!kick' && request.chat_type === 'supergroup') === 0){
            flag = true;
            if(ctx.message.entities !== undefined) {
                ctx.message.entities.some(
                    async entity => {
                        if(entity.type === 'text_mention')
                            bot.telegram.kickChatMember(originalChatId, entity.user.id)
                                .catch(err=>{
                                    console.log(err);
                                })
                    }
                )
            }
            return flag;
        }
    }
    return flag;
}