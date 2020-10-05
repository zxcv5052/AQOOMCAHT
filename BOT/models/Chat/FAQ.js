module.exports = (sequelize, Sequelize) => {
    const Chat_FAQ = sequelize.define('Chat_FAQ', {
        faq_seq:{
            type: Sequelize.INTEGER(50),
            primaryKey: true,
            autoIncrement: true
        },
        request_content_text:{
            type: Sequelize.STRING(255)
        },
        response_content_text:{
            type: Sequelize.TEXT
        },
        response_content_image:{
            type: Sequelize.STRING(255)
        },
        response_image_type:{
            type: Sequelize.STRING,
            comment: 'This is as Photo Or as File Or NULL(this is No Image)'
        },
        button:{
            type: Sequelize.TEXT
        },
        is_active:{
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    },{
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_520_ci',
        timestamps: true,
        freezeTableName: true,
        uniqueKeys: {
            faq_unique: {
                fields: ['request_content_text','chat_id']
            }
        }
    });

    return Chat_FAQ;
}