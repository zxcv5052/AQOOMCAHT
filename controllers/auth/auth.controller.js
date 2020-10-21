const jwt = require('jsonwebtoken');

exports.login = ( request ) => {
    const user  = request.user_id;
        // create a promise that generates jwt asynchronously
    return new Promise((resolve, reject) => {
            if(!user) reject();
            jwt.sign(
                {
                    _id: user
                },
                request.secret,
                {
                    expiresIn: '7d',
                    issuer: 'aqoom.com',
                    subject: 'userInfo'
                }, (err, token) => {
                    if (err) reject(err);
                    resolve(token);
                })
        });
};
exports.authMiddleWare = (req,res,next) => {
    const token = req.cookies.SID;
    const p = new Promise(
        (resolve, reject) => {
            if(!token) {
                reject();
            }
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )
    const onError = () => {
        res.redirect(403,'/');
    }
    p.then((decoded)=>{
        next();
    }).catch(onError)
}