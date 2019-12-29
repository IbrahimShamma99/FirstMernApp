var router = require('express').Router();
var helper = require('../../../Middleware/helper');
var { Routes } = require('../../../constants/constants');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');

//TODO params + populate

//SECTION add article
router.post(Routes.addProduct, helper.required, function(req, res, next) {});

module.exports = router;