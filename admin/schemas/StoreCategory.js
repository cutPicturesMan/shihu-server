let mongoose = require('mongoose');

// 商家分类
let StoreCategorySchema = mongoose.Schema({
  // 分类名称
  name: String,
  meta: {
    // 创建时间
    create: {
      type: Date,
      default: new Date()
    },
    // 修改时间
    update: {
      type: Date,
      default: new Date()
    }
  }
});

// 保存操作前做些处理
StoreCategorySchema.pre('save', (next) => {
  // 如果是新增，则同时设置create、update时间
  if(this.isNew){
    this.meta.create = this.meta.update = new Date();
  }else{
    console.log('---------------------');
    console.log(this.meta);
    // 如果是修改，则设置update
    // this.meta.update = new Date();
  }

  next();
});

StoreCategorySchema.methods.speak = function () {
  console.log('打印出名字：' + this.name);
};

module.exports = StoreCategorySchema;
