const db = require("../models");
const Words = db.restriction_words;

// Create and Save a new Word
exports.create = (request, response) => {
    if (!request.body.word_name) {
        response.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const words = {
        word_name: request.body.word_name,
        chat_id: request.body.chat_id,
    };
    Words.create(words)
        .then(num=>{
            response.status(200).send(true)
        })
        .catch( err => {
            response.status(500).send({
                message: "Cannot Create Words. Maybe Words was already exist!"
            });
        });
};

exports.findByChatId = (request, response) => {
    const chat_id = request.params.chat_id;
    const condition = chat_id ? { chat_id: chat_id } : null;

    Words.findAll({where: condition})
        .then(data => {
            response.send(data);
        })
        .catch(err=> {
            response.status(500).send(false)
        });
}

// Delete a Tutorial with the specified id in the request
exports.delete = (request, response) => {
    const id = request.params.id;

    Words.destroy({where: {id: id}})
        .then(num =>{
            if (num === 1) {
                response.status(200).send({
                    message: "Words was deleted successfully!"
                });
            } else {
                response.send({
                    message: `Cannot delete Words. Maybe Words was not found!`
                });
            }
        })
        .catch(err => {
            response.status(500).send({
                message: "Could not Delete"
            });
        });
};
