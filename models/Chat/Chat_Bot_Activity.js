module.exports = (sequelize, Sequelize) => {
    const Chat_Bot_Activities = sequelize.define('Chat_Bot_Activities', {
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

    return Chat_Bot_Activities;
}