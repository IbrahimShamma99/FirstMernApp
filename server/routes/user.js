var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
//TODO  var helper = require('../../middlewares/Helper');
var { Routes } = require('../../constants/constants');

//SECTION SignUP
router.post(Routes.signup, (req, res) => {
    var user = new User();
    try {
        user.username = req.body.user.username;
        user.email = req.body.user.email;
        user.setPassword(req.body.password);
    } catch (e) {
        console.log(e);
    };
    user.save();
    user = user.toAuthJSON();
    return res.json({
        email: user.email,
        username: user.username
    });
});