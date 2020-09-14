module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define('Message', {
        message_id:{
            primaryKey: true,
            type: Sequelize.BIGINT
        },
        message_type:{
            type: Sequelize.STRING(50)
        },
        message:{

            type: Sequelize.TEXT
        }

    },{
        timestamps: true
    });

    return Message;
}