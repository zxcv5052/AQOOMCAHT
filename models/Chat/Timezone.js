module.exports = (sequelize, Sequelize) => {
    const Chat_timezone = sequelize.define('Chat_timezone', {
        timezone_seq:{
            type: Sequelize.INT(50),
            primaryKey: true
        },
        timezone:{
            type: Sequelize.STRING(255)
        },
        offset: {
            type: Sequelize.INT(10),
        },
        tz_pos:{
            type: Sequelize.INT(2)
        }
    },{
        timestamps: false,
    });

    return Chat_timezone;
}