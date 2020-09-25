const db = require("../models");
const User_Chat_Personal = db.User_Chat_Personal;


exports.updateOrCreate = (request) => {
    return new Promise((resolve, reject) => {
        User_Chat_Personal.upsert(request)
            .then( ()=> {
                resolve();
            })
            .catch( (err)=> {
                reject(err)
            });
    })
};

/**
 * @param request ( chat_id )
 * @returns {Promise<List<User_Chat_Personal>>}
 */
exports.findByChat = request =>{
    return new Promise((resolve, reject) => {
        User_Chat_Personal.findAll(
            {
                attributes: ['seq','restriction_date','is_admin','is_bot','is_active'],
                include: [
                    {
                        required: false,
                        model: db.User,
                        attributes: ['user_id','first_name', 'last_name','user_name']
                    }
                ],
                where: {chat_id: request.chat_id},
                raw: false
            })
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

/**
 * 안 쓸 수도?
 * @param request ( chat_id )
 * @returns {Promise<db.User_Chat_Personal>}
 */
exports.findByIsAdmin = request =>{
    return new Promise((resolve, reject) => {
        User_Chat_Personal.findAll({where: {is_bot: true, chat_id: request.chat_id}})
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}