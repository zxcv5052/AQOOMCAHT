const { User_Chat_Whitelist: UserChatWhiteController } = require("../models");

exports.create = (request) => {
    const whitelist = {
        user_id: request.user_id,
        chat_id: request.chat_id
    };

    return new Promise((resolve, reject) => {
        UserChatWhiteController.create(whitelist)
            .then( ()=>
               resolve()
            )
            .catch( (err)=> {
                reject(err)
            });
    })
};
/**
 * @param request ( chat_id & user_id )
 */
exports.findByChatIdUserId = request =>{
    return new Promise((resolve, reject) => {
        UserChatWhiteController.findOne(
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
        UserChatWhiteController.findAll({where : {chat_id : chat_id}})
            .then(data => {
                if(data.length === 0 ) resolve();
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
        UserChatWhiteController.destroy({where: {seq: seq}})
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
