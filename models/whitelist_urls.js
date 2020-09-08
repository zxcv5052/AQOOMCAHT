module.exports = (sequelize, Sequelize) => {
    const whitelist_urls = sequelize.define('whitelist_url', {
        url_pattern: {
            type: Sequelize.STRING(255),
            allowNull: false,
            validate:{
                isUrl: true
            }
        },
        chat_id: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: 1
        },
    },{
        timestamps: true,
        uniqueKeys: {
            restriction_urls_unique: {
                fields: ['url_pattern', 'chat_id']
            }
        }
    });

    return whitelist_urls;
}