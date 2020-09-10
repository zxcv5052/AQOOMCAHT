const db = require("../models");
const ChatRoom = db.chat;

// Create and Save a new Word
exports.create = (request) => {
    if (!request) {
        response.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const chat = {
        id: request.id,
        type: request.type,
        title: request.title,
        user_name: request.user_name,
    };
    ChatRoom.create(chat)
        .then(num=>{
            response.status(200).send(true)
        })
        .catch( err => {
            response.status(500).send({
                message: "Cannot Create Room. Maybe Room was already exist!"
            });
        });
};
