module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        user_id:{
            primaryKey: true,
            type: Sequelize.BIGINT
        },
        first_name:{
            type: Sequelize.STRING(50)
        },
        last_name:{
            type: Sequelize.STRING(50)
        },
        user_name:{
            type: Sequelize.STRING(50)
        }
    },{
        timestamps: true,
        freezeTableName: true
    });

    return User;
}