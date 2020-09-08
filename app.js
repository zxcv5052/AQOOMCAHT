const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const optionsRouter = require('./routes/options');
const accumulationsRouter = require('./routes/accumaltions')
const roomsRouter = require('./routes/rooms')
const usersRouter = require('./routes/users');

const { sequelize } = require('./models');

const app = express();

sequelize.sync();

/**
 * 파일 or 데이터베이스에 로그를 남기고 싶다면 wiston 모듈을 찾아 보도록 하자.
 */
app.use(logger('dev')); //  dev must change to < common or combine > when 배포
app.use(express.json());    // it can do post request ( because it is include body-parser )
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);
app.use('/options', optionsRouter);
app.use('/accumulations', accumulationsRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

module.exports = app;
