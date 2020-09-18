const db = require("../models");
const Chat_greeting = db.Chat_greeting;

// Create and Save a new Word
exports.create = (request) => {
    const greeting = {
        chat_id: request.chat_id
    };

    return new Promise(async (resolve, reject) => {
        if(greeting.word === undefined || greeting.word === "" || greeting.chat_id === undefined) return reject('plz, set word');
        Chat_greeting.create(greeting)
            .then(data => {
                if(!data) reject();
                else resolve();
            })
            .catch(err=> {
                reject();
            });
    })
};

/**
 * @param request ( greeting_seq )
 * @returns {Promise<chat_greeting>}
 */
exports.findByPK = request => {
    return new Promise(async (resolve, reject) => {
        if(request.greeting_seq === undefined) return reject('not find ');
        Chat_greeting.findByPk(request.greeting_seq)
            .then((result)=>{
                resolve(result);
            })
            .catch(()=>{
                reject();
            })
    });
}
/**
 * @param request ( chat_id )
 * @returns {Promise<List<greeting_word>>}
 */
exports.findByChatId = request => {
    return new Promise(async (resolve, reject) => {
        if(request.chat_id === undefined) return reject('not find ')
        Chat_greeting.findAll({
            raw: true,
            where: {chat_id: request.chat_id, is_active: true},
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
    const greetingSeq = request.greeting_seq;

    return new Promise(async (resolve, reject) => {
        if(greetingSeq === undefined) return reject("already delete");

        Chat_greeting.update({is_active: false},{where: {greeting_seq: greetingSeq}})
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
