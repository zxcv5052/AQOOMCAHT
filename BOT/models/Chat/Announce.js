module.exports = (sequelize, Sequelize) => {
    const Chat_announce = sequelize.define('Chat_announce', {
        announce_seq:{
            type: Sequelize.INTEGER(50),
            primaryKey: true,
            autoIncrement: true
        },
        announce_content:{
            type: Sequelize.TEXT
        },
        announce_type:{
            type: Sequelize.INTEGER(5)
        },
        scheduler_id: {
            type: Sequelize.INTEGER(10)
        },
        scheduler_month: {
            type: Sequelize.INTEGER(2)
        },
        scheduler_dayofmonth: {
            type: Sequelize.INTEGER(2)
        },
        scheduler_dayofweek: {
            type: Sequelize.INTEGER(2)
        },
        scheduler_hour: {
            type: Sequelize.INTEGER(2)
        },
        scheduler_min: {
            type: Sequelize.INTEGER(2)
        },
        button:{
            type: Sequelize.TEXT
        }
    },{
        timestamps: false,
        freezeTableName: true
    });

    return Chat_announce;
}