module.exports = (sequelize, Sequelize) => {
    const User_Chat_Personal = sequelize.define('User_Chat_Personal', {
        seq:{
            primaryKey: true,
            type: Sequelize.INTEGER(20),
            autoIncrement: true
        }
    },{
        timestamps: false,
        freezeTableName: true
    });

    return User_Chat_Personal;
}