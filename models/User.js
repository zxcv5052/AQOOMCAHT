module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        user_id:{
            primaryKey: true,
            type: Sequelize.BIGINT(20)
        },
        first_name:{
            type: Sequelize.STRING(50)
        },
        last_name:{
            type: Sequelize.STRING(50)
        },
        user_name:{
            type: Sequelize.STRING(50)
        },
        is_bot:{
            type: Sequelize.BOOLEAN
        },
        is_new:{
            type: Sequelize.BOOLEAN
        },
        is_admin:{
            type: Sequelize.BOOLEAN
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        }
    },{
        freezeTableName: true
    });

    return User;
}