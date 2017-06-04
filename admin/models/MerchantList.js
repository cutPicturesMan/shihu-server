let mongoose = require('mongoose');
let MerchantListSchema = require('../schemas/MerchantList');
let MerchantList = mongoose.model('MerchantList', MerchantListSchema);

module.exports = MerchantList;