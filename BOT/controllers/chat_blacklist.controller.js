const db = require("../models");
const Words = db.Chat_blacklist;

const sequelize = require("sequelize");
const Op = sequelize.Op;

// Create and Save a new Word
exports.create = request => {
    const words = {
        word: request.word.trim(),
        chat_id: request.chat_id
    };

    return new Promise(async (resolve, reject) => {
        if(words.word === undefined || words.word === "" || words.chat_id === undefined) return reject(400);
        Words.create(words)
            .then(data => {
                resolve();
            })
            .catch(()=> {
                reject(500);
            });
    })
};

exports.findByChatId = request => {
    let chat_id = request.chat_id;

    return new Promise(async (resolve, reject) => {
        if(chat_id === undefined) return reject(400)
        Words.findAll({
            raw: true,
            where: {chat_id: chat_id, is_active: true},
            attributes: ['word']
        })
            .then(data => {
                resolve(data);
            })
            .catch(()=> {
                reject(500);
            });
    })
}

// Delete a Tutorial with the specified id in the request
exports.delete = request => {
    const blacklist_seq = request.blacklist_seq;

    return new Promise(async (resolve, reject) => {
        if(blacklist_seq === undefined) return reject();

        Words.update({is_active: false},{where: {blacklist_seq: blacklist_seq}})
            .then(num => {
                if (num===0) {
                    resolve(num);
                } else {
                    resolve();
                }
            })
            .catch(err => {
                reject();
            });
    });
};
