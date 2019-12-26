'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    Product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
}, {
    timestamps: true
});

//export our module to use in server.js
module.exports = mongoose.model('Comment', CommentsSchema);