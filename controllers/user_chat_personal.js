const db = require("../models");
const User_Chat_Personal = db.User_Chat_Personal;

exports.findOrCreate = (request) => {
    const user_chat = {
        user_id: request.user_id,
        chat_id: request.chat_id,
        is_bot: request.is_bot || false,
        is_admin: request.is_admin
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
                reject(err)
            });
    })
};

/**
 * @param request ( chat_id )
 * @returns {Promise<List<User_Chat_Personal>>}
 */
exports.findByChat = request =>{
    return new Promise((resolve, reject) => {
        User_Chat_Personal.findAll({where: {chat_id: request.chat_id}})
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

/**
 * @returns {Promise<db.User_Chat_Personal>}
 */
exports.findByIsAdmin = () =>{
    return new Promise((resolve, reject) => {
        User_Chat_Personal.findAll({where: {is_bot: true}})
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}


