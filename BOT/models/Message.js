module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define('Message', {
        message_id:{
            primaryKey: true,
            type: Sequelize.BIGINT(20)
        },
        chat_id:{
            primaryKey: true,
            type: Sequelize.BIGINT(20)
        },
        user_id:{
            primaryKey: true,
            type: Sequelize.BIGINT(20)
        },
        message_type:{
            type: Sequelize.STRING(50)
        },
        message:{
            type: Sequelize.TEXT,
            allowNull: true
        },
        entity:{
            type: Sequelize.TEXT
        },
        reply_to_message_id:{
            type: Sequelize.BIGINT(20),
            allowNull: true
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    },{
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_520_ci',
        timestamps: false,
        freezeTableName: true,
    });

    return Message;
}