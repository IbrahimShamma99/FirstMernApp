'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * @ProductOwner => owner is a user found by id 
 * NOTE @ProductName , @ProductImages ,
 *  @category , @price , @onSale  => MUST BE PROVIDED
 * 
 */

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