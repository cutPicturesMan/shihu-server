let mongoose = require('mongoose');
let ShopCategorySchema = require('../schema/shop_category');
let ShopCategory = mongoose.model('ShopCategory', ShopCategorySchema);

module.exports = ShopCategory;