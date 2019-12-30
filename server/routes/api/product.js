var router = require('express').Router();
var helper = require('../../../Middleware/helper');
var { Routes, params } = require('../../../constants/constants');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');

//NOTE : We are making a product param to search in products DB by id
router.param(params.product,
    function(req, res, next, ProductId) {
        Product.findOne({ ProductId: ProductId })
            .populate(params.ProductOwner)
            .then(function(product) {
                //NOTE in case product not found
                if (!product) {
                    return res.sendStatus(404);
                };
                req.product = product;
                return next(); //MiddleWare
            })
            .catch(next);
    });

//SECTION add article
router.post(Routes.addProduct, helper.required,
    function(req, res, next) {
        User.findById(req.payload.id).then((user) => {
            const productInfo = req.body.product;
            product = new Product(productInfo);
            return product.save().then(function() {
                return res.json({ product: product.toJSONFor(user) });
            });
        }).catch(next);
    });
router.delete(Routes.product, helper.required,
    function(req, res, next) {
        User.findById(req.payload.id).then(function(user) {
            if (req.product.ProductOwner._id.toString() === req.payload.id.toString()) {
                return req.product.remove().then(function() {
                    return res.sendStatus(204);
                });
            } else {
                return res.sendStatus(403);
            };
        }).catch(next);
    });
module.exports = router;