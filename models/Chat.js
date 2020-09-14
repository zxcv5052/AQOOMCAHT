module.exports = (sequelize, Sequelize) => {
    const Chat = sequelize.define('Chat', {
        chat_id:{
            type: Sequelize.BIGINT,
            primaryKey: true
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
        creator_name:{
            type: Sequelize.STRING(50)
        },
        anti_image:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
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
        }
    },{
        timestamps: true,
        freezeTableName: true
    });

    return Chat;
}