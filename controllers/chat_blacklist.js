const db = require("../models");
const Words = db.Chat_blacklist;

const sequelize = require("sequelize");
const Op = sequelize.Op;

// Create and Save a new Word
exports.create = (request) => {
    const words = {
        word: request.word.trim(),
        chat_id: request.chat_id
    };

    return new Promise(async (resolve, reject) => {
        if(words.word === undefined || words.word === "" || words.chat_id === undefined) return reject('plz, set word');
        Words.create(words)
            .then(data => {
                if(!data) reject();
                else resolve();
            })
            .catch(err=> {
                reject();
            });
    })
};

exports.findByChatId = (request) => {
    let chat_id = request.chat_id;

    return new Promise(async (resolve, reject) => {
        if(chat_id === undefined) return reject('not find to chat_id')
        Words.findAll({
            raw: true,
            where: {chat_id: chat_id, is_active: true},
            attributes: ['word']
        })
            .then(data => {
                resolve(data);
            })
            .catch(err=> {
                reject('some db executing is error');
            });
    })
}

// Delete a Tutorial with the specified id in the request
exports.delete = (request) => {
    const blacklist_seq = request.blacklist_seq;

    return new Promise(async (resolve, reject) => {
        if(blacklist_seq === undefined) return reject("already delete");

        Words.update({is_active: false},{where: {blacklist_seq: blacklist_seq}})
            .then(num => {
                if (num) {
                    resolve("Words was deleted successfully!");
                } else {
                    reject(`Cannot delete Words. Maybe Words was not found!`);
                }
            })
            .catch(err => {
                reject("Could not Delete");
            });
    });
};
