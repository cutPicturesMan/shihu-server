let mongoose = require('mongoose');
let StoreSchema = require('../schemas/Store');
let Store = mongoose.model('Store', StoreSchema);

module.exports = StoreList;