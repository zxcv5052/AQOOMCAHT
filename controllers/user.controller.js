const db = require("../models");
const User = db.User;

exports.create = (request) => {
    const user = {
        user_id : request.user_id,
        first_name : request.first_name,
        last_name : request.last_name,
        is_bot : request.is_bot || false,
        is_new : request.is_new || false,
        is_admin : request.is_admin || false,
    };
    return new Promise(async (resolve, reject) => {
        User.create(user)
            .then(()=>{
                resolve();
            })
            .catch( () => {
                reject()
            });
    });
};


