module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        is_bot:{
            type: Sequelize.BOOLEAN
        },
        is_admin:{
            type: Sequelize.BOOLEAN
        },
        is_new:{
            type: Sequelize.BOOLEAN
        },
        first_name:{
            type: Sequelize.STRING(255)
        },
        last_name:{
            type: Sequelize.STRING
        },
        username:{
            type: Sequelize.STRING
        },
        language_code:{
            type: Sequelize.STRING
        },
        created_at:{
            type: Sequelize.DATE
        },
        updated_at:{
            type: Sequelize.DATE
        },
        warning_pt:{
            type: Sequelize.INTEGER
        },
        score:{
            type: Sequelize.BIGINT
        },
        restricted_time:{
            type: Sequelize.DATE
        }
    },{
        timestamps: false,
        freezeTableName: true
    });

    return User;
}