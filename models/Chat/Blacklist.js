module.exports = (sequelize, Sequelize) => {
    const Chat_blacklist = sequelize.define('Chat_blacklist', {
        blacklist_seq:{
            type: Sequelize.INT(50),
            primaryKey: true
        },
        word: {
            type: Sequelize.STRING(50)
        },
        chat_id: {
            type: Sequelize.BIGINT(20),
            allowNull: false
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    },{
        timestamps: false,

        uniqueKeys: {
            restriction_words_unique: {
                fields: ['word', 'chat_id']
            }
        }
    });

    return Chat_blacklist;
}