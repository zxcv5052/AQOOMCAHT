const db = require("../models");
const Chat = db.Chat;

exports.create = (request) => {
    const chat = {
        chat_id: request.chat_id,
        type: request.type,
        group_name: request.group_name,
        title: request.title,
        creator_name: request.creator_name
    };
    return new Promise(async (resolve, reject) => {
        Chat.create(chat)
            .then(()=>{
                resolve();
            })
            .catch( () => {
                reject("Cannot Create Room. Maybe Room was already exist!")
            });
    });
};

/**
 * 고려해야될 사항 : chat 의 updatedAt만 사용하려하는가? ( chat_id 에서 진행이 된다면 update를 진행해야함. )
 * title이 바뀔 때는 감지가 가능하다.
 * but, 그룹-> 채널 | 그룹 -> supergroup | channel -> group 감지가 가능하려나..?
 */
exports.update = () => {
    Chat.update();
}
