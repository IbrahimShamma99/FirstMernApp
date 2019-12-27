var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');
//TODO  var helper = require('../middlewares/Helper');
var { Routes } = require('../../../constants/constants');

//SECTION SignUP
router.post(Routes.signup, (req, res, next) => {
    var user = new User();
    var RegisterationInfo = req.body.user;
    try {
        user.username = RegisterationInfo.username;
        user.email = RegisterationInfo.email;
        user.setPassword(RegisterationInfo.password);
    } catch (e) {
        console.log(e);
        res.send(e);
    };
    user.save().then(function() {
        user = user.toAuthJSON();
        return res.json({
            email: user.email,
            username: user.username
        }).status(200);
    }).catch(next);
});

module.exports = router;