module.exports = (sequelize, Sequelize) => {
    const Chat_announce = sequelize.define('Chat_announce', {
        announce_seq:{
            type: Sequelize.INT(50),
            primaryKey: true
        },
        announce_content:{
            type: Sequelize.TEXT
        },
        announce_type:{
            type: Sequelize.INT(5)
        },
        scheduler_id: {
            type: Sequelize.INT(10)
        },
        scheduler_month: {
            type: Sequelize.INT(2)
        },
        scheduler_dayofmonth: {
            type: Sequelize.INT(2)
        },
        scheduler_dayofweek: {
            type: Sequelize.INT(2)
        },
        scheduler_hour: {
            type: Sequelize.INT(2)
        },
        scheduler_min: {
            type: Sequelize.INT(2)
        },
        button:{
            type: Sequelize.TEXT
        }
    },{
        timestamps: false
    });

    return Chat_announce;
}