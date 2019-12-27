'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsSchema = new Schema({
    ProductOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ProductName: String,
    ProductDiscription: String,
    ProductImages: { type: String },
    price: { type: String },
    category: String,
    onSale: Boolean,
    Comments: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    NumberOfAvailableQuantities: Number
}, {
    timestamps: true
});

mongoose.model('Product', ProductsSchema);