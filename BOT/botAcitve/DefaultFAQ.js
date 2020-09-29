/**
 * Bot이 특정 단어를 듣게 될 때 쓴다. EX) !***
 * Default 종류
 *  - ban
 *  - unban
 * Custom 종류
 *  - DB에 있는 내용으로 변하면 된다.
 */

exports.customAndDefaultFAQ = (request, message, chatRules, originalChatId, bot) => {
    let flag = false;
    if(request.status !== 'member'){
        if(request.message.indexOf('!unban' && request.chat_type === 'supergroup') === 0){
            flag = true;
            if(message.entities !== undefined){
                message.entities.some(
                    async entity =>{
                       if(entity.type === 'text_mention')
                             bot.telegram.unbanChatMember(originalChatId, entity.user.id)
                                .catch(err=>{
                                    console.log(err);
                                })
                    }
                )
            }
        }
        if(request.message.indexOf('!ban' && request.chat_type === 'supergroup') === 0){
            flag = true;
            if(message.entities !== undefined) {
                message.entities.some(
                    async entity => {
                        if(entity.type === 'text_mention')
                            bot.telegram.kickChatMember(originalChatId, entity.user.id)
                                .catch(err=>{
                                    console.log(err);
                                })
                    }
                )
            }
        }
        if(request.message.indexOf('!kick' && request.chat_type === 'supergroup') === 0){
            flag = true;
            if(message.entities !== undefined) {
                message.entities.some(
                    async entity => {
                        if(entity.type === 'text_mention')
                            bot.telegram.kickChatMember(originalChatId, entity.user.id)
                                .catch(err=>{
                                    console.log(err);
                                })
                    }
                )
            }
        }
    }
    return flag;
}