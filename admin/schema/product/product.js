let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// 商品规格
let SkuSchema = Schema({
  skuId: Schema.Types.ObjectId,
  name: {
    type: String,
    required: [true, '请填写商品的规格名称']
  },
  price: {
    type: Number,
    required: [true, '请填写商品的规格价格']
  },
  // 商品剩余数量，为0则表示无限制
  stock: {
    type: Number,
    default: 0
  },
  // 折扣，默认为100，9.8折填写98
  discount: {
    type: Number,
    default: 100
  }
}, {
  _id: false
});

// 商品
let ProductSchema = Schema({
  // 商品名称
  name: {
    type: String,
    unique: true,
    required: [true, '请填写商品名称']
  },
  // 店铺
  shopId: {
    type: Schema.Types.ObjectId,
    required: [true, '请填写商品所属的店铺id'],
    // 所属店铺shopId的值必须存在于店铺Shop表中
    ref: 'Shop'
  },
  // // 分类Id
  // categoryId: {
  //   type: schema.Types.ObjectId,
  //   required: [true, '请填写商品所属的分类id']
  // },
  // 商品描述
  description: {
    type: String,
    default: ''
  },
  // 商品图片
  imageUrl: {
    type: String,
    default: ''
  },
  // 商品规格
  sku: {
    type: [SkuSchema],
    required: [true, '请至少填写一个商品规格']
  }
}, {
  timestamps: true
});

module.exports = ProductSchema;
