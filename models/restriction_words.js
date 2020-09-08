module.exports = (sequelize, Sequelize) => {
    const restriction_words = sequelize.define('restriction_words', {
        word_name: {
            type: Sequelize.STRING(255),
            allowNull: false,
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
            restriction_words_unique: {
                fields: ['word_name', 'chat_id']
            }
        }
    });

    return restriction_words;
}