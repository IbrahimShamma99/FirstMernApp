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
    ProductId: { required: true, type: String },
    price: { type: String },
    category: String,
    onSale: Boolean,
    Comments: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    NumberOfAvailableQuantities: Number
}, {
    timestamps: true
});
ProductsSchema.methods.generateProductId = function() {
    this.ProductId = '_' + Math.random().toString(36).substr(2, 9);
    return this;
};
mongoose.model('Product', ProductsSchema);