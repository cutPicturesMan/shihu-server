let mongoose = require('mongoose');
let StoreCategorySchema = require('../schemas/StoreCategory');
let StoreCategory = mongoose.model('StoreCategory', StoreCategorySchema);

module.exports = StoreCategory;