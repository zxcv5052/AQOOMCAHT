module.exports = (sequelize, Sequelize) => {
    const Chat_greeting = sequelize.define('Chat_greeting', {
        greeting_seq:{
            type: Sequelize.INT(50),
            primaryKey: true
        },
        greeting_text:{
            type: Sequelize.TEXT
        },
        greeting_image: {
            type: Sequelize.STRING(255),
        },
        response_type:{
            type: Sequelize.BOOLEAN
        },
        is_active:{
            type: Sequelize.BOOLEAN
        },
        button:{
            type: Sequelize.STRING(250)
        }
    },{
        timestamps: true
    });

    return Chat_greeting;
}