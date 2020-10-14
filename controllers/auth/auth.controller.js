const jwt = require('jsonwebtoken');

exports.login = ( request ) => {
    const { user } = request.body;
    const secret = request.app.get('jwt-secret');
        // create a promise that generates jwt asynchronously
    return new Promise((resolve, reject) => {
            if(!user) reject();
            jwt.sign(
                {
                    _id: user.id
                },
                secret,
                {
                    expiresIn: '1d',
                    issuer: 'aqoom.com',
                    subject: 'userInfo'
                }, (err, token) => {
                    if (err) reject(err);
                    resolve(token);
                })
        });
};

exports.check = (req, res) => {
    // read the token from header or url
    const token = req.headers['x-access-token'] || req.query.token
    // token does not exist
    if(!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    // if token is valid, it will respond with its info
    const respond = (token) => {
        res.json({
            success: true,
            info: token
        })
    }

    // if it has failed to verify, it will return an error message
    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

    // process the promise
    p.then(respond).catch(onError)
}