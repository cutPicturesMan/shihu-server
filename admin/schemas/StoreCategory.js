let mongoose = require('mongoose');

// 店铺分类
let StoreCategorySchema = mongoose.Schema({
  // 分类名称
  name: String,
  // 分类代表的数字
  category: Number,
  meta: {
    // 创建时间
    create: Date,
    // 修改时间
    update: Date
  }
});

StoreCategorySchema.methods.speak = function(){
  console.log('打印出名字：' + this.name);
}

module.exports = StoreCategorySchema;
