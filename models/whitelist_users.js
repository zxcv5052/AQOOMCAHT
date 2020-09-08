module.exports = (sequelize, Sequelize) => {
    const whitelist_users = sequelize.define('whitelist_user', {
        chat_id: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
        },
        user_name: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
    },{
        timestamps: true,
        uniqueKeys: {
            restriction_users_unique: {
                fields: ['chat_id', 'user_name']
            }
        }
    });

    return whitelist_users;
}