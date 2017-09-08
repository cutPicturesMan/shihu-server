let mongoose = require('mongoose');
let ShopSchema = require('../../schema/shop/shop');
let Shop = mongoose.model('Shop', ShopSchema);

module.exports = Shop;