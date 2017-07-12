let mongoose = require('mongoose');
let ProductSchema = require('../Schema/Product');
let Product = mongoose.model('Product', ProductSchema);
//
// Product.on('index', function(error) {
//   console.log('--------------------------');
//   console.log(error);
// });

module.exports = Product;