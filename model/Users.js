'use strict';
//import dependency
var mongoose = require('mongoose');
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




module.exports = mongoose.model('User', UsersSchema);