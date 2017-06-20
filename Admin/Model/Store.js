let mongoose = require('mongoose');
let StoreSchema = require('../Schema/Store');
let Store = mongoose.model('Store', StoreSchema);

module.exports = Store;