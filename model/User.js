'use strict';
//NOTE import dependencies
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var jwt = require('jsonwebtoken');
var secret = require("../config/config").secret;

/**
 * @username =>user's username 
 * @FavoriteProducts => user's favorite products
 * @hash , @salt => related to the password
 */
var UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    image: String,
    FavoriteProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    hash: String,
    salt: String
}, { timestamps: true });

// UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};


UserSchema.methods.toAuthJSON = function() {
    return {
        username: this.username,
        email: this.email,
        //TODO generateJWT [Done]
        token: this.generateJWT(),
        bio: this.bio,
        image: this.image
    };
};

UserSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};


mongoose.model('User', UserSchema);