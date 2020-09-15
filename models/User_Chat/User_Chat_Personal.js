module.exports = (sequelize, Sequelize) => {
    const User_Chat_Personal = sequelize.define('User_Chat_Personal', {
        seq:{
            primaryKey: true,
            type: Sequelize.INTEGER(20),
            autoIncrement: true
        },
        warning_pt:{
            type: Sequelize.INTEGER(10)
        }
    },{
        timestamps: false,
        freezeTableName: true
    });

    return User_Chat_Personal;
}