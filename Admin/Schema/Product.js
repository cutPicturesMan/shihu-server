let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// 商品
let ProductSchema = Schema({
  // 商品名称
  name: {
    type: String,
    required: [true, '请填写商品名称']
  },
  // 商品描述
  description: String,
  // 商品图片
  imageUrl: String,
  test: [{
    name: {
      type: String,
      required: [true, '请填写测试的规格名称']
    }
  }]
  // // 商品规格
  // sku: [{
  //   skuId: Schema.Types.ObjectId,
  //   name: {
  //     type: String,
  //     required: [true, '请填写商品的规格名称']
  //   },
  //   price: {
  //     type: Number,
  //     required: [true, '请填写商品的规格价格']
  //   },
  //   // 商品剩余数量，为0则表示无限制
  //   stock: {
  //     type: Number,
  //     default: 0
  //   },
  //   // 折扣，默认为100，9.8折填写98
  //   discount: {
  //     type: Number,
  //     default: 100
  //   }
  // }]
  //   {
  //     "specId": 72970000222,
  //     "name": "大份",
  //     "price": 18,
  //     "stock": 9000,
  //     "maxStock": 10000,
  //     "packingFee": 3,
  //     "onShelf": 1,
  //     "extendCode": "1234567890",
  //     "barCode": "X148948686356666",
  //     "weight": 123,
  //     "activityLevel": 1
  //   }
  // ]
}, {
  timestamps: true
});

module.exports = ProductSchema;
