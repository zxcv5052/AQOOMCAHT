const db = require("../models");
const sequelize = require('sequelize')
const moment = require('moment');
const User_Chat_Personal = db.User_Chat_Personal;
const Extra = require('telegraf/extra')

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
/**
 * BlackListWord를 사용했을 때 사용이 된다.
 * @param request
 * @param originChatId
 * @param chatRules
 * @param bot
 * @returns {Promise<unknown>}
 */
exports.updateToRestriction = (request,originChatId,chatRules, bot) => {
    return new Promise(async (resolve, reject) => {
        const model = await User_Chat_Personal.findOne({where: {chat_id: request.chat_id, user_id : request.user_id}});
        model.warning_pt += 1;
        if(0 === (model.warning_pt%chatRules.restrict_limit)){
            const _until_date = moment().add(chatRules.restrict_time,'minutes').unix();
            if(chatRules.restrict_type === 'ban'){
                await bot.telegram.kickChatMember(originChatId, request.user_id, _until_date);
            }else{
                await bot.telegram.restrictChatMember(originChatId, request.user_id, {permissions: 0, until_date: _until_date});
                model.restriction_date = _until_date;
            }
        }
        await model.save()
            .then(()=>{
                resolve();
            }).catch(err=>{
                console.log(err)
                reject();
            })
    })
}
