const { Chat_FAQ: ChatFunction } = require("../models");

exports.create = request=>{
    return new Promise(async (resolve, reject) => {

        if(request.request_content_text.trim() === '!' || (request.response_content_text === '' && request.response_content_image === ''))
            reject();
        ChatFunction.create(request)
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
        ChatFunction.findAll({
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
        ChatFunction.update({
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
        ChatFunction.delete({
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