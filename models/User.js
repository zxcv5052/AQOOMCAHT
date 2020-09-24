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
        warning_pt:{
            type: Sequelize.INTEGER(10),
            defaultValue: 0
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        }
    },{
        freezeTableName: true
    })
    return User;
}