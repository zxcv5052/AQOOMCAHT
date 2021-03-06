module.exports = (sequelize, Sequelize) => {
    const Chat = sequelize.define('Chat', {
        chat_id:{
            type: Sequelize.BIGINT(20),
            primaryKey: true
        },
        user_id:{
            type: Sequelize.BIGINT(20)
        },
        type:{
            allowNull: false,
            type: Sequelize.ENUM({
                values: [ 'private','group','supergroup','channel' ]
            })
        },
        group_name:{
            type: Sequelize.STRING(255)
        },
        restrict_type:{
            type: Sequelize.ENUM({
                values: ['none', 'ban','restrict' ]
            }),
            defaultValue: 'none'
        },
        restrict_limit:{
            type: Sequelize.INTEGER(10),
            defaultValue: 5
        },
        restrict_date:{
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        anti_url:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        anti_forward:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        anti_join_message:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        anti_left_message:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        anti_longname:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        anti_flood:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        anti_command:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        is_active:{
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    },{
        freezeTableName: true
    });

    return Chat;
}