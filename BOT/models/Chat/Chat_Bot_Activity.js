module.exports = (sequelize, Sequelize) => {
    const Chat_Bot_Activity = sequelize.define('Chat_Bot_Activity', {
        seq:{
            primaryKey: true,
            type: Sequelize.BIGINT,
            autoIncrement: true
        },
        action:{
            type: Sequelize.STRING(10)
        }
    },{
        timestamps: true,
        freezeTableName: true
    });

    return Chat_Bot_Activity;
}