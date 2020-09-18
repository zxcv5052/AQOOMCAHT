const db = require("../models");

const sequelize = require("sequelize");
const Op = sequelize.Op;
const Message = db.Message;

exports.create = (request) => {
    const message = {
        message_id: request.message_id,
        message_type: request.message_type,
        message: request.message,
        reply_to_message_id: request.reply_to_message_id,
        chat_id: request.chat_id,
        user_id: request.user_id
    };
    return new Promise(async (resolve, reject) => {
        Message.create(message)
            .then(()=>{
                resolve();
            })
            .catch( (err) => {
                reject(err)
            });
    });
};

/**
 * @param request ( user_id & chat_id & messageType(s) )
 * delete, new_chat_user, left_chat_user
 */
exports.findByChatUser = request => {
    const message = {
        message_type: request.message_type,
        chat_id: request.chat_id,
        user_id: request.user_id
    };
    return new Promise(async (resolve, reject) => {
        Message.findAll({
            where:{
                message_type: {
                    [Op.or] : message.message_type
                },
                chat_id: message.chat_id,
                user_id: message.user_id
            }
        })
            .then((data)=>{
                resolve(data);
            })
            .catch( (err) => {
                reject(err)
            });
    });
}

/**
 * @param request ( chat_id & dateTime & messageType )
 */
exports.findByTypeDate = request =>{

}

