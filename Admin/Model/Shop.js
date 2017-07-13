let mongoose = require('mongoose');
let ShopSchema = require('../Schema/Shop');
let Shop = mongoose.model('Shop', ShopSchema);

module.exports = Shop;