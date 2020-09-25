const db = require("../models");
const User = db.User;

/**
 * @param request ( user_id, first_name, last_name, user_name ) if already exists add ( updateAt )
 * @returns {Promise<none>}
 */
exports.updateOrCreate = request => {
    return new Promise(async (resolve, reject) => {
        User.upsert({
            user_id: request.user_id,
            first_name: request.first_name,
            last_name: request.last_name,
            user_name: request.username,
            updatedAt: new Date()
        })
            .then((result)=>{
                resolve(result[1]);
            })
            .catch( (err) => {
                reject(err)
            });
    });
};
/**
 * @param request ( user_id )
 * @returns {Promise<List<db.User>>}
 */
exports.findByPk = request =>{
    return new Promise((resolve, reject) => {
        User.findByPk(request.user_id)
            .then(result=>{
                if(result===undefined) resolve();
                else resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

exports.findByName = request => {

}
