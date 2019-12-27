'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * @author => comment's author
 * @text => body of the comment
 * @Product => Product user comments on
 */
var CommentSchema = new Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    Product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
}, {
    timestamps: true
});

mongoose.model('Comment', CommentSchema);