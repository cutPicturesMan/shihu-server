let mongoose = require('mongoose');

let StoreSchema = mongoose.Schema({
  name: String,
  category: Number
});

StoreSchema.pre('save', (res, req) => {
  console.log(111);
});

StoreSchema.methods.speak = function () {
  console.log('打印出名字：' + this.name);
};

module.exports = StoreSchema;