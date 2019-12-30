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
    this.ProductId = Math.random().toString(36).substr(2, 9);
    return this;
};

ProductsSchema.methods.toJSONFor = function(user) {
    return {
        ProductOwner: user.toProfileJSONFor(),
        ProductDiscription: this.ProductDiscription,
        ProductName: this.ProductName,
        price: this.price,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        category: this.category,
        //TODO: favorited: user ? user.isFavorite(this._id) : false,
        //favoritesCount: this.favoritesCount,
        NumberOfAvailableQuantities: this.NumberOfAvailableQuantities,
    };
};

mongoose.model('Product', ProductsSchema);