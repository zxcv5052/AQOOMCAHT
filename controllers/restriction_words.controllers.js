const db = require("../models");
const Words = db.restriction_words;

const sequelize = require("sequelize");
const Op = sequelize.Op;

// Create and Save a new Word
exports.create = (request, response) => {
    if (!request) {
        response.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const words = {
        word_name: request,
        chat_id: request,
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

exports.findByChatId = (request) => {
    let chat_id = request.chat_id;

    return new Promise(async (resolve, reject) => {
        Words.findAll({
            raw: true,
            where: {chat_id: chat_id},
            attributes: ['word_name']
        })
            .then(data => {
                resolve(data);
            })
            .catch(err=> {
                reject(new Error(err));
            });
    })
}

// Delete a Tutorial with the specified id in the request
exports.delete = (request, response) => {
    const id = request.params.id;

    Words.destroy({where: {id: id}})
        .then(num =>{
            if (num) {
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
