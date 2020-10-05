module.exports = (sequelize, Sequelize) => {
    const Chat_timezone = sequelize.define('Chat_timezone', {
        timezone_seq:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        timezone:{
            type: Sequelize.STRING(255)
        },
        offset: {
            type: Sequelize.INTEGER(10),
        },
        tz_pos:{
            type: Sequelize.INTEGER(2)
        }
    },{
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_520_ci',
        timestamps: false,
        freezeTableName: true
    });

    return Chat_timezone;
}