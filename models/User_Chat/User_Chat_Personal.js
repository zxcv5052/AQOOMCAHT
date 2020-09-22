module.exports = (sequelize, Sequelize) => {
    const User_Chat_Personal = sequelize.define('User_Chat_Personal', {
        seq:{
            primaryKey: true,
            type: Sequelize.INTEGER(20),
            autoIncrement: true
        },
        warning_pt:{
            type: Sequelize.INTEGER(10),
            defaultValue: 0
        },
        restriction_date:{
            type: Sequelize.DATE,
            allowNull: true
        },
        is_admin:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        is_bot:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        is_active:{
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    },{
        timestamps: false,
        freezeTableName: true
    });

    return User_Chat_Personal;
}