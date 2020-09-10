module.exports = (sequelize, Sequelize) => {
    const chat = sequelize.define('chat', {
        id:{
            type: Sequelize.BIGINT,
            primaryKey: true
        },
        type:{
            type: Sequelize.ENUM({
                values: [ 'private','group','supergroup','channel' ]
            })
        },
        title:{
            type: Sequelize.STRING(255)
        },
        username:{
            type: Sequelize.STRING(255)
        },
        first_name:{
            type: Sequelize.STRING(255)
        },
        last_name:{
            type: Sequelize.STRING(255)
        },
        username:{
            type: Sequelize.STRING(255)
        },
        all_members_are_administrators:{
            type: Sequelize.BOOLEAN
        },
        created_at:{
            type: Sequelize.DATE
        },
        updated_at:{
            type: Sequelize.DATE
        },
        old_id:{
            type: Sequelize.INTEGER
        },
        depence_count:{
            type: Sequelize.BIGINT
        },
        is_active:{
            type: Sequelize.DATE
        },
        is_block_bot:{
            type: Sequelize.BOOLEAN
        },
        is_block_invite:{
            type: Sequelize.BOOLEAN
        },
        is_restrict_new_member:{
            type: Sequelize.BOOLEAN
        },
        is_img_filter:{
            type: Sequelize.BOOLEAN
        },
        is_ordering_comeout:{
            type: Sequelize.BOOLEAN
        },
        activation_code:{
            type: Sequelize.STRING
        },
        count_msgs:{
            type: Sequelize.INTEGER
        },
        restriction_time:{
            type: Sequelize.DATE
        }
    },{
        timestamps: false,
        freezeTableName: true
    });

    return chat;
}