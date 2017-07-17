let mongoose = require('mongoose');
let ProductCategorySchema = require('../Schema/ProductCategory');
let ProductCategory = mongoose.model('ProductCategory', ProductCategorySchema);

module.exports = ProductCategory;