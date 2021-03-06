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
            type: Sequelize.BOOLEAN,
            defaultValue: false
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
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_520_ci',
        freezeTableName: true
    })
    return User;
}