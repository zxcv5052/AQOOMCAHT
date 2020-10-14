const { Chat_blacklist } = require("../models");

const sequelize = require("sequelize");
const Op = sequelize.Op;

// Create and Save a new Word
exports.create = request => {
    const words = {
        word: request.word,
        chat_id: request.chat_id
    };
    return new Promise(async (resolve, reject) => {
        if(words.trim() === "" || words.word === undefined) return reject(400);
        Chat_blacklist.create(words)
            .then(() => {
                resolve();
            })
            .catch(()=> {
                reject(500);
            });
    })
};

exports.findByChatId = request => {
    return new Promise(async (resolve, reject) => {
        if(request.chat_id === undefined) return reject(400)
        Chat_blacklist.findAll({
            raw: true,
            where: {chat_id: request.chat_id, is_active: true},
            attributes: ['word']
        })
            .then(data => {
                if(data === undefined) resolve();
                else resolve(data);
            })
            .catch(err => {
                reject(500);
            });
    })
}

// Delete a Tutorial with the specified id in the request
exports.delete = request => {
    return new Promise(async (resolve, reject) => {
        if(request.id === undefined) return reject();
        Chat_blacklist.update({is_active: false},{where: {blacklist_seq: request.id}})
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
