let mongoose = require('mongoose');

let MerchantListSchema = mongoose.Schema({
  name: String,
  category: Number
});

MerchantListSchema.methods.speak = function(){
  console.log('打印出名字：' + this.name);
}

module.exports = MerchantListSchema;