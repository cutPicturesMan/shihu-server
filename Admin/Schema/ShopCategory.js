let mongoose = require('mongoose');

// 商家分类
let ShopCategorySchema = mongoose.Schema({
  // 分类名称
  name: String
}, {
  timestamps: true
});

ShopCategorySchema.methods.speak = function () {
  console.log('打印出名字：' + this.name);
};

module.exports = ShopCategorySchema;
