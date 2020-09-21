const db = require("../models");
const Chat_greeting = db.Chat_greeting;

// Create and Save a new Word
exports.create = (request) => {
    return new Promise(async (resolve, reject) => {
        if(request.greeting_image === undefined && request.greeting_text === undefined) resolve(500);
        Chat_greeting.create(request)
            .then(data => {
                if(!data) resolve();
                else resolve();
            })
            .catch(()=> {
                reject(500);
            });
    })
};

/**
 * @param request ( greeting_seq )
 * @returns {Promise<chat_greeting>}
 */
exports.findByPK = request => {
    return new Promise(async (resolve, reject) => {
        if(request.greeting_seq === undefined) return reject(500);
        Chat_greeting.findByPk(request.greeting_seq)
            .then((result)=>{
                resolve(result);
            })
            .catch(()=>{
                reject(500);
            })
    });
}
/**
 * @param request ( chat_id )
 * @returns {Promise<List<greeting_word>>}
 */
exports.findByChatId = request => {
    return new Promise(async (resolve, reject) => {
        if(request.chat_id === undefined) return reject(500)
        Chat_greeting.findAll({
            where: {chat_id: request.chat_id, is_active: true},
        })
            .then(data => {
                if(data.length===0) resolve();
                else resolve(data);
            })
            .catch(()=> {
                reject(500);
            });
    })
}

// Delete a Tutorial with the specified id in the request
exports.delete = (request) => {
    const greetingSeq = request.greeting_seq;

    return new Promise(async (resolve, reject) => {
        if(greetingSeq === undefined) return reject(500);

        Chat_greeting.update({is_active: false},{where: {greeting_seq: greetingSeq}})
            .then(num => {
                if (num === 1) {
                    resolve(num);
                } else {
                    resolve();
                }
            })
            .catch(() => {
                reject(500);
            });
    });
};
