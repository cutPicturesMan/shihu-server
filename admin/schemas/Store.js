let mongoose = require('mongoose');

let StoreSchema = mongoose.Schema({
  name: String,
  category: Number
});

StoreSchema.methods.speak = function(){
  console.log('打印出名字：' + this.name);
}

module.exports = StoreSchema;