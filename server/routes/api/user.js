var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');
//TODO  var helper = require('../middlewares/Helper');
var { Routes } = require('../../../constants/constants');

//SECTION SignUP
router.post(Routes.signup, (req, res, next) => {
    var user = new User();
    try {
        user.username = req.body.user.username;
        user.email = req.body.user.email;
        user.setPassword(req.body.user.password);
        console.log(user);
    } catch (e) {
        console.log(e);
    };
    user.save().then(function() {
        user = user.toAuthJSON();
        return res.json({
            email: user.email,
            username: user.username
        });
    }).catch(next);
});

module.exports = router;