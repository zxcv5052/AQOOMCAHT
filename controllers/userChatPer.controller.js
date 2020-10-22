const { User_Chat_Personal , User} = require("../models");


exports.findOrCreate = (request) => {
    return new Promise((resolve, reject) => {
        User_Chat_Personal.findOrCreate({
            where : { chat_id : request.chat_id, user_id : request.user_id },
            defaults: {
                is_bot: request.is_bot
            }
        })
            .then( ()=>
                resolve()
            )
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
                attributes: ['user_id','restriction_date','status'],
                include: [
                    {
                        required: false,
                        model: User,
                        attributes: ['is_bot','first_name', 'last_name','user_name']
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
 * @param request ( user_id )
 * @returns {Promise<db.User_Chat_Personal>}
 */
exports.findByPermission = request =>{
    return new Promise((resolve, reject) => {
        User_Chat_Personal.findAll({where: {status: "administer", user_id: request.user_id}})
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}