var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


// APP GLOBAL VAR CONFIG
// -----------------------------------------------------
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





// MIDDLEWARE CONFIG
// -----------------------------------------------------
// session handler [ express-session > https://github.com/expressjs/session ]
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


// ROUTES DEFINITION
// -----------------------------------------------------
var rLogin = require('./routes/login');
var rServer = require('./routes/server');

// routes
var rParcours = require('./routes/parcours');
var rQuestions = require('./routes/questions');
var rBalises = require('./routes/balises');
var rEntrepreneurs = require('./routes/entrepreneurs');
var rComptes = require('./routes/comptes');

// data access layer
var rDalUsers = require('./dal/users');
var rDalTasks = require('./dal/tasks');
var rDalParcours = require('./dal/parcours');
var rDalBalises = require('./dal/balises');
var rDalQuestions = require('./dal/questions');
var rDalEntrepreneurs = require('./dal/entrepreneurs');

// api
var rApiEntrepreneurs = require('./api/entrepreneurs');
var rApiBalises = require('./api/balises');
var rApiQuestions = require('./api/questions');

// ROUTES CONFIGURATION
// -----------------------------------------------------
app.use('/', rLogin);
app.use('/', rServer);

app.use('/parcours', rParcours);
app.use('/questions', rQuestions);
app.use('/balises', rBalises);
app.use('/entrepreneurs', rEntrepreneurs);
app.use('/comptes', rComptes);

app.use('/dal/users', rDalUsers);
app.use('/dal/tasks', rDalTasks);
app.use('/dal/parcours', rDalParcours);
app.use('/dal/balises', rDalBalises);
app.use('/dal/questions', rDalQuestions);
app.use('/dal/entrepreneurs', rDalEntrepreneurs);

app.use('/api/entrepreneurs', rApiEntrepreneurs);
app.use('/api/balises', rApiBalises);
app.use('/api/questions', rApiQuestions);



// SERVER CONFIG
// -----------------------------------------------------
var port = 8000;
var server = app.listen(port, '0.0.0.0');
console.log('Access the server at : http://localhost:'+port);



// ERROR HANDLERS
// -----------------------------------------------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} else {
    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}
module.exports = app;
