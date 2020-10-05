

const db = require("../models");
const Chat_FAQ = db.Chat_FAQ;

exports.create = request=>{
    return new Promise(async (resolve, reject) => {

        if(request.request_content_text.trim() === '!' || (request.response_content_text === '' && request.response_content_image === ''))
            reject();
        Chat_FAQ.create(request)
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    });
}

exports.findByChat = request =>{
    return new Promise(async (resolve, reject) => {
        Chat_FAQ.findAll({
            where:{
                chat_id: request.chat_id
            }
        })
            .then(result=>{
                resolve(result)
            })
            .catch(err=>{
                reject(err);
            })
    });
}

exports.update = request =>{
    return new Promise(async (resolve, reject) => {
        Chat_FAQ.update({
            where:{
                chat_id: request.chat_id
            },
            defaultValue:{
                updatedAt: new Date()
            }
        })
            .then(result=>{
                resolve(result)
            })
            .catch(err=>{
                reject(err);
            })
    });
}

exports.delete = request=>{
    return new Promise(async (resolve, reject) => {
        Chat_FAQ.delete({
            where:{
                chat_id: request.chat_id
            }
        })
            .then(result=>{
                if(result===undefined) resolve()
                else resolve(result)
            })
            .catch(err=>{
                reject(err);
            })
    });
}