var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var logresults = require('./routes/logresults');
var monitoredsite = require('./routes/monitoredsite');
var urlfailures = require('./routes/urlfailures');

var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());


var connection = require('express-myconnection'),
    mysql = require('mysql');

app.use(

    connection(mysql, {
        host: 'localhost',
        user: 'user',
        password: 'password',
        database: 'dbname',
        debug: false
    }, 'request')

);

app.use('/api/logresults', logresults);
app.use('/api/monitoredsite', monitoredsite);
app.use('/api/urlfailures', urlfailures);


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.use(function(err, req, res, next) {

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;