const db = require("../models");
const Chat = db.Chat;

exports.updateOrCreate = request => {
    return new Promise(async (resolve, reject) => {
        Chat.upsert(request)
            .then(()=>{
                resolve();
            })
            .catch( (err) => {
                reject(err);
            });
    });
};

exports.create = request => {
    return new Promise(async (resolve, reject) => {
        Chat.create(request)
            .then(()=>{
                resolve();
            })
            .catch( (err) => {
                reject(err)
            });
    });
};

exports.findByUser = request =>{
    return new Promise(async (resolve, reject) => {
        Chat.findAll({
            where: {
                user_id : request.user_id,
                is_active: true
            }
        })
            .then((result)=>{
                resolve(result);
            })
            .catch((err)=>{
                reject(err);
            })
    });
}

exports.findByChat = request => {
    return new Promise(async (resolve, reject) => {
        Chat.findByPk(request.chat_id)
            .then((result)=>{
                resolve(result);
            })
            .catch((err)=>{
                reject(err);
            })
    });
}

exports.updateForMigrate = request => {
    return new Promise(async (resolve, reject) => {
        Chat.update(
            {
                type: "moved",
                is_active: 0,
            },
            {where: {chat_id: request.chat_id}})
            .then((num)=>{
                if(num === 0) resolve();
                else resolve(num);
            })
            .catch( (err) => {
                reject(err)
            });
    });
}

exports.updateForRestriction = request => {
    return new Promise(async (resolve, reject) => {
        Chat.update(
            {
                anti_image: request.anti_image,
                anti_url: request.anti_url,
                anti_forward: request.anti_forward,
                anti_join_message: request.anti_join_message,
                anti_left_message: request.anti_left_message,
                anti_longname: request.anti_longname,
                anti_flood: request.anti_flood,
                anti_command: request.anti_command,
            },
            {where: {chat_id: request.chat_id}})
            .then((num)=>{
                if(num === 0) resolve();
                else resolve(num);
            })
            .catch( (err) => {
                reject(err)
            });
    });
}
exports.updateForRestrictionLimit = request => {
    return new Promise(async (resolve, reject) => {
        Chat.update(
            {
                restrict_type: request.restrict_type,
                restrict_limit: request.restrict_limit,
                restrict_time: request.restrict_time,
            },
            {where: {chat_id: request.chat_id}})
            .then((num)=>{
                if(num === 0) resolve();
                else resolve(num);
            })
            .catch( (err) => {
                reject(err)
            });
    });
}

exports.delete = request => {
    return new Promise(async (resolve, reject) => {
        Chat.update({is_active: false}, {where: {chat_id: request.chat_id}})
            .then(()=>{
                resolve();
            })
            .catch( (err) => {
                reject(err)
            });
    });
};
