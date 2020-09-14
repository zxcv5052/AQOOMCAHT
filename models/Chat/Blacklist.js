module.exports = (sequelize, Sequelize) => {
    const Chat_blacklist = sequelize.define('Chat_blacklist', {
        blacklist_seq:{
            type: Sequelize.INTEGER(50),
            primaryKey: true
        },
        word: {
            type: Sequelize.STRING(50)
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    },{
        timestamps: false,
        freezeTableName: true,

        uniqueKeys: {
            restriction_words_unique: {
                fields: ['word', 'chat_id']
            }
        }
    });

    return Chat_blacklist;
}