const db = require("../models");
const Chat = db.Chat;

exports.create = (request) => {
    const chat = {
        chat_id: request.chat_id,
        type: request.type,
        group_name: request.group_name,
        title: request.title,
        creator_name: request.creator_name
    };
    return new Promise(async (resolve, reject) => {
        Chat.create(chat)
            .then(()=>{
                resolve();
            })
            .catch( () => {
                reject("Cannot Create Room. Maybe Room was already exist!")
            });
    });
};

exports.update = () => {
        Chat.update();
}
