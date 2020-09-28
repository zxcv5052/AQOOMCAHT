/**
 * Bot이 특정 단어를 듣게 될 때 쓴다. EX) !***
 * Default 종류
 *  - ban
 *  - unban
 * Custom 종류
 *  - DB에 있는 내용으로 변하면 된다.
 */

exports.defaultFAQ = async (request, message, bot) => {
    if(request.status !== 'member'){
        if(request.message.indexOf('!unban') === 0){
            if(message.entities !== undefined){
                message.entities.some(
                    entity =>{
                        if(entity.type==='text_mention')
                            bot.telegram.unbanChatMember(request.chat_id, entity.user.id)
                                .then(() =>{
                                    bot.reply('Unban 수행 완료');
                                })
                    }
                )
            }
        }
        if(request.message.indexOf('!ban') === 0){
            if(message.entities !== undefined) {
                message.entities.some(
                    entity => {
                        if (entity.type === 'text_mention')
                            bot.telegram.kickChatMember(request.chat_id, entity.user.id)
                                .then(() => {
                                    bot.reply('ban 수행 완료');
                                })
                    }
                )
            }
        }
    }

}

exports.customFAQ = {

}