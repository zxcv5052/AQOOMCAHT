const db = require("../models");
const User_Chat_Personal = db.User_Chat_Personal;

exports.findOrCreate = (request) => {
    const user_chat = {
        user_id: request.user_id,
        chat_id: request.chat_id,
        is_bot: request.is_bot || false
    };

    return new Promise((resolve, reject) => {
        User_Chat_Personal.findOrCreate({
            where : { chat_id : user_chat.chat_id, user_id : user_chat.user_id },
            defaults: {
                is_bot: request.is_bot
            }
        })
            .then( ()=>
                resolve()
            )
            .catch( (err)=> {

                reject()
            });
    })
};
