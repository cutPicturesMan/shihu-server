let mongoose = require('mongoose');
let ProductCategorySchema = require('../../schema/product/product_category');
let ProductCategory = mongoose.model('ProductCategory', ProductCategorySchema);

module.exports = ProductCategory;