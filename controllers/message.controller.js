const { Message } = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const axios = require('axios').default
const moment = require('moment')
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

exports.create = (request) => {
    return new Promise(async (resolve, reject) => {
        Message.create(request)
            .then(()=>{
                resolve();
            })
            .catch( (err) => {
                reject(err)
            });
    });
};

/**
 * @param request ( user_id & chat_id & messageType(s) )
 * delete, new_chat_user, left_chat_user
 */
exports.findByChatUser = request => {
    return new Promise(async (resolve, reject) => {
        Message.findAll({
            where:{
                message_type: request.message_type,
                chat_id: request.chat_id,
                user_id: request.user_id
            }
        })
            .then((data)=>{
                resolve(data);
            })
            .catch( (err) => {
                reject(err)
            });
    });
}

/**
 * @param request ( chat_id & dateTime & messageType )
 */
exports.findByTypeDate = request => {
    return new Promise(async (resolve, reject) => {

        Message.findAll({
            where: {
                message_type: request.message_type,
                chat_id: request.chat_id,
                createdAt: {
                    [Op.between]: [moment(request.date_from), moment(request.date_to).startOf('day').add(1,'days')]
                }
            }
        })
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    });
};

exports.sendReply = request => {
    // message send ( telegram api로 작성하면 됨. )
    return new Promise(async (resolve, reject) => {
       const result = await axios.post(`https://api.telegram.org/bot${require('../config/botkey.json').test_botKey}/sendMessage`,{
           chat_id: request.chat_id,
           text: request.message,
           reply_to_message_id : request.reply_to_message_id
       }, {
           cancelToken: source.token
       });
       if( result.data.ok ) {
           request['message_id'] = result.data.result.message_id;
           request['user_id'] = result.data.result.from.id;
           request['message_type'] = 'bot_reply'
           this.create(request)
               .then(()=>{
                   resolve();
               })
               .catch(err=>{
                   console.log(err);
               })
           resolve();
       }
       else reject();
    });
}
