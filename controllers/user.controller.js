const db = require("../models");
const User = db.User;

exports.updateOrCreate = request => {
    return new Promise(async (resolve, reject) => {
        User.upsert({
            user_id: request.user_id,
            first_name: request.first_name,
            last_name: request.last_name,
            user_name: request.username,
            updatedAt: new Date()
        })
            .then()
            .catch( (err) => {
                reject(err)
            });
    });
};
exports.findByChat = request =>{

}
exports.findByUser = request =>{
    const user_id = request.user_id;
    return new Promise((resolve, reject) => {
        User.findAll({where: {user_id: user_id}})
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}