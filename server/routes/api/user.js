var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');
//TODO  var helper = require('../middlewares/Helper');
var { Routes } = require('../../../constants/constants');
var passport = require("passport");
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
            username: user.username,
            token: user.token
        }).status(200);
    }).catch(next);
});

//SECTION login 
router.post(Routes.login, function(req, res, next) {
    const LoginInfo = req.body.user;
    if (!LoginInfo.email) {
        res.send(422).json({ error: { message: "please provice email " } });
    };
    if (!LoginInfo.password) {
        return res.status(422).json({ errors: { password: "can't be blank" } });
    }
    passport.authenticate('local', { session: false },
        function(err, user, info) {
            if (err) { return next(err); };
            console.log("USER=", user);
            if (user) {
                user.token = user.generateJWT();
                user = user.toAuthJSON();
                return res.json({
                    username: user.username,
                    email: user.email,
                    token: user.token
                });
            } else {
                return res.status(422).json(info);
            }
        })(req, res, next);
});

module.exports = router;