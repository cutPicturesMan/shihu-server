let mongoose = require('mongoose');
// {
//   "name": "麦当劳",
//     "description": "美味可口，就在麦当劳",
//     "imageUrl": "img",
//     "photoList": [{
//     "imgUrl": "大图地址_1",
//     "thumbUrl": "缩略图地址_1"
//   }, {
//     "imgUrl": "大图地址_2",
//     "thumbUrl": "缩略图地址_2"
//   }],
//     "isPremium": true,
//     "isOnTime": true,
//     "addressText": "厦门市观日路8号",
//     "latitude": 123456789,
//     "longitude": 123456789,
//     "status": 1,
//     "servingTime": [{
//     "begin": "08:00",
//     "end": "12:00"
//   }],
//     "phone": "15960210046,13950381053",
//     "deliverAmount": 20,
//     "agentFee": 5,
//     "noAgentFeeTotal": 50
// }

// {
//   "name": "苹果",
//   "shopId": "59676d4b3773b024c4392499",
//   "description": "甜脆爽口",
//   "imageUrl": "img",
//   "sku": [{
//   "name": "水晶",
//   "price": 3,
//   "stock": 3,
//   "discount": 100
// }, {
//   "name": "水晶",
//   "price": 3,
//   "stock": 3,
//   "discount": 100
// }]
// }
// 用户
let TestSchema = mongoose.Schema({
  color: String,
  name: String
});

module.exports = TestSchema;
