'use strict';
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require("cors");
var session = require('express-session');
var config = require("../config/config");

var App = express();
App.use(cors());

//NOTE Import Schemas
require('../model/User');
require('../model/Product');
require('../model/Comment');
require('../config/passport');
App.use(require('morgan')('dev'));
App.use(bodyParser.urlencoded({ extended: false }));
App.use(bodyParser.json());


App.use(session({
    secret: 'ProductManager',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));
App.use(require('./routes'));

var isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
    mongoose
        .connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })
} else {
    mongoose
        .connect(config.LocalEnvDB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
    mongoose.set('debug', true);
};
// App.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.json({
//         'errors': {
//             message: err.message,
//             error: {}
//         }
//     });
// });

module.exports = App;