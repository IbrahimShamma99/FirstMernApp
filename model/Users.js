'use strict';
//import dependency
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true
    },

    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    image: String,
    FavoriteProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
    hash: String,
    salt: String
}, { timestamps: true });

UsersSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.toAuthJSON = function() {
    return {
        username: this.username,
        email: this.email,
        // TODO :token: this.generateJWT(),
        bio: this.bio,
        image: this.image
    };
};

UsersSchema.methods.generateJWT = function() {};

module.exports = mongoose.model('User', UsersSchema);