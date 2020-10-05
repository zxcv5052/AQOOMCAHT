module.exports = (sequelize, Sequelize) => {
    const User_Chat_Personal = sequelize.define('User_Chat_Personal', {
        chat_id : {
            type: Sequelize.BIGINT,
            primaryKey: true
        },
        user_id :{
            type: Sequelize.BIGINT,
            primaryKey: true
        },
        warning_pt:{
            type: Sequelize.INTEGER(10),
            defaultValue: 0
        },
        restriction_date:{
            type: Sequelize.DATE,
            allowNull: true
        },
        status:{
            type: Sequelize.STRING
        },
        updatedAt:{
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    },{
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_520_ci',
        timestamps: false,
        freezeTableName: true,
    });

    return User_Chat_Personal;
}