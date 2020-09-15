module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define('Message', {
        message_id:{
            primaryKey: true,
            type: Sequelize.BIGINT(20)
        },
        message_type:{
            type: Sequelize.STRING(50)
        },
        message:{
            type: Sequelize.TEXT
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    },{
        freezeTableName: true
    });

    return Message;
}