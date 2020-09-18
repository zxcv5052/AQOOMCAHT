const db = require("../models");
const User_Chat_Whitelist = db.User_Chat_Whitelist;

exports.create = (request) => {
    const whitelist = {
        user_id: request.user_id,
        chat_id: request.chat_id
    };

    return new Promise((resolve, reject) => {
        User_Chat_Whitelist.create(whitelist)
            .then( ()=>
               resolve()
            )
            .catch( ()=> {
                reject("Cannot Create Url. Maybe Url was already exist Or Url was not valid")
            });
    })
};
/**
 * @param request ( chat_id & user_id )
 */
exports.findByChatIdUserId = request =>{
    return new Promise((resolve, reject) => {
        User_Chat_Whitelist.findOne(
            {
                where :
                    {chat_id : request.chat_id, user_id : request.user_id}
            })
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(undefined);
            });
    });
}
exports.findByChatId = (request) => {
    const chat_id = request.chat_id;

    return new Promise((resolve, reject) => {
        User_Chat_Whitelist.findOne({where : {chat_id : chat_id}})
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

exports.delete = (request) => {
    const seq = request.seq;

    return new Promise((resolve, reject) => {
        User_Chat_Whitelist.destroy({where: {seq: seq}})
            .then(num => {
                if (num === 1) {
                    resolve();
                } else {
                    reject(`Cannot delete Url. Maybe Url was not found!`);
                }
            })
            .catch(err => {
                reject(err);
            });
    });
};
