'use strict'
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require("cors");
var session = require('express-session');
var errorhandler = require('errorhandler');
var App = express();
App.use(cors());
var config = require("../config/config");
//NOTE Import Schemas
require('../model/User');
require('../model/Product');
require('../model/Comment');

var App = express();

App.use(cors());
require('../config/passport');

// Normal express config defaults
App.use(require('morgan')('dev'));
App.use(bodyParser.urlencoded({ extended: false }));
App.use(bodyParser.json());

App.use(require('method-override')());
App.use(express.static(__dirname + '/public'));

App.use(session({
    secret: 'conduit',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));
//NOTE Import Database

App.use(require('./routes'));

/// catch 404 and forward to error handler
App.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
var isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
    App.use(errorhandler());
}
if (isProduction) {
    mongoose
        .connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })
} else {
    console.log("LOCAL ENV =", config.LocalEnvDB);
    mongoose
        .connect(config.LocalEnvDB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });
    mongoose.set('debug', true);
}
App.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        'errors': {
            message: err.message,
            error: {}
        }
    });
});

module.exports = App;