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

/**
 * @param request ( user_id )
 * @returns {Promise<db.Chat>}
 */
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

/**
 *
 * @param request ( chat_id )
 * @returns {Promise<db.Chat>}
 */
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

/**
 * title이 바뀔 때는 감지가 가능하다.
 * but, 그룹-> 채널 | 그룹 -> supergroup | channel -> group 감지가 가능하려나..?
 * 고려해야 할 사항 : join message 를 만약 true로 바꾼다면 greeting Message 는 지워져야하는가?(is_active change false?)
 */
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
                anti_command: request.anti_command
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
}
