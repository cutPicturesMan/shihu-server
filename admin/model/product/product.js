let mongoose = require('mongoose');
let ProductSchema = require('../../schema/product/product');
let Product = mongoose.model('Product', ProductSchema);
//
// Product.on('index', function(error) {
//   console.log('--------------------------');
//   console.log(error);
// });

module.exports = Product;