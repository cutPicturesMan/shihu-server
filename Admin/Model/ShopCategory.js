let mongoose = require('mongoose');
let ShopCategorySchema = require('../Schema/ShopCategory');
let ShopCategory = mongoose.model('ShopCategory', ShopCategorySchema);

module.exports = ShopCategory;