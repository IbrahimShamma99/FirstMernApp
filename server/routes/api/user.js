var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');
//TODO  var helper = require('../middlewares/Helper');
var { Routes } = require('../../../constants/constants');
var passport = require("passport");

//SECTION Signup
router.post(Routes.signup, async(req, res, next) => {
    var user = new User();
    var RegisterationInfo = req.body.user;
    try {
        user.username = RegisterationInfo.username;
        user.email = RegisterationInfo.email;
        user.setPassword(RegisterationInfo.password);
        user.token = user.generateJWT();

    } catch (e) {

    };
    user.save(function(err) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(422).send({ succes: false, message: 'User already exist!' });
            }
            return res.status(422).send(err);
        }
        res.json({
            username: user.username,
            email: user.email,
            token: user.token
        });
    });
})

//SECTION login 
router.post(Routes.login, function(req, res, next) {
    const UserInfo = req.body.user;
    //NOTE if the email or password weren't provided
    if (!UserInfo.email) {
        res.send(422).json({ error: { message: "please provice email " } });
    };
    if (!UserInfo.password) {
        return res.status(422).json({ errors: { password: "can't be blank" } });
    };
    passport.authenticate('local', { session: false },
        function(err, user, info) {
            if (err) {
                return res.status(422).send({ error: { message: "authentication failed" } });

            };
            if (user) {
                user.token = user.generateJWT();
                user = user.toAuthJSON();
                return res.status(200).json({
                    username: user.username,
                    email: user.email,
                    token: user.token
                });
            } else {
                return res.status(422).json(info);
            }
        })(req, res, next);
});

//SECTION edit User
router.put(Routes.user, (req, res, next) => {
    const UserInfo = req.body.user;
    const user = User.findById(UserInfo.id).then(function(user) {
        if (!user) { return res.sendStatus(401); }
    });

    if (typeof UserInfo.username !== 'undefined') {
        user.username = UserInfo.username;
    };
    if (typeof UserInfo.email !== 'undefined') {
        user.email = UserInfo.email;
    };
    user.save().then(function() {
        return res.status(200).json({
            username: user.username,
            email: user.email,
            token: user.token
        });
    }).catch(next);
});


module.exports = router;