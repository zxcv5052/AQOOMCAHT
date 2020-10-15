const jwt = require('jsonwebtoken');
const _ = require('lodash');

export const createToken = async ( user, secret_ac, secret_re ) =>{
    const createAccessToken = jwt.sign(
        {
            user: _.pick(user, ['id',''])   // id, username 저장.
        },
        secret_ac,
        {
            expiresIn: '1h'
        }
    );

    const createRefreshToken = jwt.sign(
        {
            user: _.pick(user, 'id')   // id, username 저장.
        },
        secret_re,
        {
            expiresIn: '14d'
        }
    )

    return Promise.all([createAccessToken, createRefreshToken]);
}