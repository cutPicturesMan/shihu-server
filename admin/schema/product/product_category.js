let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// 商品分类
let ProductCategorySchema = Schema({
  // 商品分类名称
  name: {
    type: String,
    required: [true, '请填写商品分类名称']
  },
  // 商品分类所属的店铺
  shop_id: {
    type: Schema.Types.ObjectId,
    required: [true, '商品分类所属的店铺id缺失'],
    ref: 'Shop'
  },
  // 该商品分类是否需要显示出来
  is_valid: {
    type: Number,
    default: 1
  },
  // 商品分类权重，数值越大，在菜单中的排序就越靠前
  weight: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

module.exports = ProductCategorySchema;
