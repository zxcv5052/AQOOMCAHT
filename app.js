const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerDoc = require('./public/swaggerDoc');
const jwtKey = require('./config/jwtkey.json');
const settingsRouter = require('./routes/settings');
const functionRouter = require('./routes/function');
const messageRouter = require('./routes/messages')
const interactionRouter = require('./routes/interaction')
const usersRouter = require('./routes/members');

const { sequelize } = require('./models');

sequelize.sync();

const app = express();

swaggerDoc(app);

/**
 * 파일 or 데이터베이스에 로그를 남기고 싶다면 wiston 모듈을 찾아 보도록 하자.
 */
app.use(logger('dev')); //  dev must change to < common or combine > when 배포
app.use(express.json());    // it can do post request ( because it is include body-parser )
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('jwt-secret', jwtKey.secret);


// app.use('/users', usersRouter);
app.use('/interaction', interactionRouter);
app.use('/setting', settingsRouter);
app.use('/function', functionRouter);
// app.use('/messages', messageRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

module.exports = app;
