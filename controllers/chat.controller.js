const db = require("../models");
const Chat = db.Chat;

exports.createOrUpdate =(request) => {
    return new Promise(async (resolve, reject) => {
        Chat.upsert({
            chat_id: request.chat_id,
            user_id: request.user_id,
            type: request.type,
            group_name: request.group_name,
            is_active: true
        })
            .then(()=>{
                resolve();
            })
            .catch( (err) => {
                reject(err);
            });
    });
};

exports.create = (request) => {
    const chat = {
        chat_id: request.chat_id,
        user_id: request.user_id,
        type: request.type,
        group_name: request.group_name
    };
    return new Promise(async (resolve, reject) => {
        Chat.create(chat)
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
 * 고려해야될 사항 : chat 의 updatedAt만 사용하려하는가? ( chat_id 에서 진행이 된다면 update를 진행해야함. )
 * title이 바뀔 때는 감지가 가능하다.
 * but, 그룹-> 채널 | 그룹 -> supergroup | channel -> group 감지가 가능하려나..?
 */
exports.update = () => {
    Chat.update();
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
