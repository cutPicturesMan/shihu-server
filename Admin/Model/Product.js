let mongoose = require('mongoose');
let StoreCategorySchema = require('../Schema/StoreCategory');
let StoreCategory = mongoose.model('StoreCategory', StoreCategorySchema);

module.exports = StoreCategory;