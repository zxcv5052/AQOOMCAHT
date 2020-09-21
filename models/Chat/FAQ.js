module.exports = (sequelize, Sequelize) => {
    const Chat_FAQ = sequelize.define('Chat_FAQ', {
        faq_seq:{
            type: Sequelize.INTEGER(50),
            primaryKey: true,
            autoIncrement: true
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
            type: Sequelize.BOOLEAN
        },
        button:{
            type: Sequelize.TEXT
        }
    },{
        timestamps: true,
        freezeTableName: true
    });

    return Chat_FAQ;
}