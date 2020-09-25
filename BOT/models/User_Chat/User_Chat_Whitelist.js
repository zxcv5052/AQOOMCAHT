module.exports = (sequelize, Sequelize) => {
    const User_Chat_Whitelist = sequelize.define('User_Chat_Whitelist', {
        seq:{
            primaryKey: true,
            type: Sequelize.INTEGER(50),
            autoIncrement: true
        }
    },{
        timestamps: false,
        freezeTableName: true
    });

    return User_Chat_Whitelist;
}