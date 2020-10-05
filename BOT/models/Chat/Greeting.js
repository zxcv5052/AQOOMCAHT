module.exports = (sequelize, Sequelize) => {
    const Chat_greeting = sequelize.define('Chat_greeting', {
        greeting_seq:{
            type: Sequelize.INTEGER(50),
            primaryKey: true,
            autoIncrement: true
        },
        greeting_text:{
            type: Sequelize.TEXT
        },
        greeting_image: {
            type: Sequelize.STRING(255),
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
        freezeTableName: true
    });

    return Chat_greeting;
}