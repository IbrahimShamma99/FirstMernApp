'use strict'
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//NOTE Import Schemas
var Comment = require('../model/Comments')
var User = require('./../model/Users')
var Product = require('./../model/Products')

var App = express();
var router = express.Router();

console.log('Node Environment :', process.env.NODE_ENV);
var isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
    mongoose
        .connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
} else {
    mongoose.connect('mongodb://localhost/ProductManager', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    mongoose.set('debug', true);
}

//Use our router configuration when we call /api
App.use('/api', router);

module.exports = { App };