const db = require("../models");
const Message = db.Message;

exports.create = (request) => {
    const message = {
        message_id: request.message_id,
        message_type: request.message_type,
        message: request.message,
        
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
    Chat.update();
}


