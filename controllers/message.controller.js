const db = require("../models");
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
            .catch( () => {
                reject()
            });
    });
};

exports.update = () => {
    Message.update();
}


