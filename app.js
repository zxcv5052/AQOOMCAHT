const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {jwtSecret} = require('./config/secret.json');
const swaggerDoc = require('./public/swaggerDoc');
// const session = require('express-session');
// const MySQLStore = require('express-mysql-session')(session); 고려는 해야 될 사항.
const {authMiddleWare} = require('./controllers/auth/auth.controller')
const settingRouter = require('./routes/settings');
const functionRouter = require('./routes/function');
const messageRouter = require('./routes/messages');
const interactionRouter = require('./routes/interaction');
const analyticRouter = require('./routes/analytic')
const groupRouter = require('./routes/groups');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const { sequelize } = require('./models');

sequelize.sync();

const app = express();

swaggerDoc(app);    // For API Docs ==> 나중 에는 지워도 무관.

/**
 * 파일 or 데이터베이스에 로그를 남기고 싶다면 wiston 모듈을 찾아 보도록 하자.
 */

app.set('jwt-secret', jwtSecret);

app.use(logger('dev')); //  dev must change to < common or combine > when 배포
app.use(express.json());    // it can do post request ( because it is include body-parser )
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/interaction', authMiddleWare);
app.use('/interaction', interactionRouter);

app.use('/groups', authMiddleWare);
app.use('/groups', groupRouter);

app.use('/analytic', authMiddleWare);
app.use('/analytic', analyticRouter);

app.use('/setting', authMiddleWare);
app.use('/setting', settingRouter);

app.use('/function', authMiddleWare);
app.use('/function', functionRouter);

app.use('/users', authMiddleWare);
app.use('/users', userRouter);

app.use('/message', authMiddleWare);
app.use('/message', messageRouter);

//
app.use('/auth', authRouter);
app.use(function(req, res, next) {
    next(createError(404));
});

module.exports = app;
