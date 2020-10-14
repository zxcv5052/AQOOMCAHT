const { Bot_activity } = require("../models");

const sequelize = require("sequelize");
const Op = sequelize.Op;

exports.create = request =>{
    return new Promise(async (resolve, reject) => {
        Bot_activity.create(request)
            .then(result=>{
                resolve(result)
            })
            .catch(err=>{
                reject();
            })
    });
}