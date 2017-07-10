let mongoose = require('mongoose');
let ProductSchema = require('../Schema/Product');
let Product = mongoose.model('Product', ProductSchema);

module.exports = Product;