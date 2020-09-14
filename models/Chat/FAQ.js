module.exports = (sequelize, Sequelize) => {
    const Chat_FAQ = sequelize.define('Chat_FAQ', {
        faq_seq:{
            type: Sequelize.INT(50),
            primaryKey: true
        },
        content:{
            type: Sequelize.TEXT
        },
        response_content_text:{
            type: Sequelize.TEXT
        },
        response_content_image:{
            type: Sequelize.STRING(255)
        },
        response_type:{
            type: Sequelize.TINYINT
        },
        enabled_condition:{
            type: Sequelize.SMALLINT(3)
        },
        button:{
            type: Sequelize.STRING(255)
        }
    },{
        timestamps: true,
        freezeTableName: true
    });

    return Chat_FAQ;
}