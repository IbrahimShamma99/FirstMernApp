var router = require('express').Router();
var helper = require('../../../Middleware/helper');
var { Routes, params } = require('../../../constants/constants');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');

//TODO params + populate

router.param(params.product,
    function(req, res, next, ProductId) {
        Product.findOne({ ProductId: ProductId })
            .populate(params.ProductOwner)
            .then(function(product) {
                //NOTE in case product not found
                if (!product) {
                    return res.sendStatus(404);
                }
                req.product = product;
                return next(); //MiddleWare
            })
            .catch(next);
    });

//SECTION add article
router.post(Routes.addProduct, helper.required, function(req, res, next) {});

module.exports = router