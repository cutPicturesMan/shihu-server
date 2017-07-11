let mongoose = require('mongoose');

// 商品
let ProductSchema = mongoose.Schema({
  // 商品名称
  name: {
    type: String,
    required: [true, '请填写商品名称']
  },
  // 商品描述
  description: String,
  // 商品图片
  imageUrl: String,
  // 商品规格
//   specs:
//     "name": "白切鸡",
//   "description": "香脆可口，外焦里嫩",
//   "imageHash": "3077080f760e7bf0fc985e23dd3e36e2",
//   "labels": {
//   "isFeatured": 1,
//     "isGum": 0,
//     "isNew": 0,
//     "isSpicy": 0
// },
// "specs": [
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
// ],
//   "sellingTime": {
//   "weeks": [
//     "MONDAY"
//   ],
//     "beginDate": "2017-03-14",
//     "endDate": "2017-06-22",
//     "times": [
//     {
//       "beginTime": "18:02",
//       "endTime": "19:02"
//     }
//   ]
// },
// "attributes": [
//   {
//     "name": "甜度",
//     "details": [
//       [
//         "5分甜",
//         "7分甜"
//       ]
//     ]
//   }
// ],
//   "backCategoryId": 126
}, {
  timestamps: true
});

module.exports = ProductSchema;
