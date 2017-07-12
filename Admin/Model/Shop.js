let mongoose = require('mongoose');
let StoreSchema = require('../Schema/Shop');
let Store = mongoose.model('Store', StoreSchema);

module.exports = Store;