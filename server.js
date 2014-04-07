// main server file. Handle and routing request in our app

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8888;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var io       = require('socket.io').listen(app.listen(port));
// var path = require('path');

var configDB = require('./config/database.js');

// configuration =================

// DB configuration
mongoose.connect(configDB.url); // connect to our database - define in config/database.js

require('./config/passport')(passport); // pass passport for configuration

app.configure(function(){
    // set up our express application

    app.use(express.logger('dev')); // log every request to console
    app.use(express.cookieParser()); // read cookies >> need for authen
    app.use(express.bodyParser()); // get information from html form
    app.use(express.static(__dirname + '/public'));

    app.set('view engine', 'ejs'); // set up ejs for templating, can use jade for instead.
    // Tell express where it can find the templates
    app.set('views', __dirname + '/views');


    // require for passport
    app.use(express.session({secret: 'my-real-private-chat-application'})); // session secret key
    app.use(passport.initialize());
    app.use(passport.session()); // persitent login session
    app.use(flash()); // use connect-flash for flash messages stored in session

    // Hiding log messages from socket.io. Comment to show everything.
    io.set('log level', 1);
});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// routes for chat ===============================================================
require('./app/routes-chat.js')(app,io);
// require('./app/')


// launch ======================================================================
// app.listen(port);
console.log('The magic happens on port ' + port);

