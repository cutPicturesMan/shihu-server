let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// {
//   "name": "麦当劳",
//   "description": "美味可口，就在麦当劳",
//   "imageUrl": "img",
//   "photoList": [{
//   "imgUrl": "大图地址_1",
//   "thumbUrl": "缩略图地址_1"
// }, {
//   "imgUrl": "大图地址_2",
//   "thumbUrl": "缩略图地址_2"
// }],
//   "isPremium": true,
//   "isOnTime": true,
//   "addressText": "厦门市观日路8号",
//   "latitude": 123456789,
//   "longitude": 123456789,
//   "status": 1,
//   "servingTime": [{
//   "begin": "08:00",
//   "end": "12:00"
// }],
//   "phoneList": "15960210046,13950381053",
//   "deliverAmount": 20,
//   "agentFee": 5,
//   "noAgentFeeTotal": 50
// }

// 店铺图片列表
let photoSchema = Schema({
  imgUrl: String,
  thumbUrl: String
});

// 营业时间
let servingTimeSchema = Schema({
  begin: {
    type: String,
    required: [true, '请选择开始营业时间']
  },
  end: {
    type: String,
    required: [true, '请选择结束营业时间']
  },
});

// 店铺模式
let ShopSchema = Schema({
  // 店铺 ID
  id: Schema.Types.ObjectId,
  // 餐厅名称
  name: {
    type: String,
    required: [true, '餐厅名称不能为空']
  },
  // 餐厅所属分类
  // category: {
  //   type: Number,
  //   required: [true, '请选择餐厅分类']
  // },
  // 餐厅描述
  description: {
    type: String,
    default: ''
  },
  // 餐厅Logo地址
  // 如果没有，用默认图片替代
  imageUrl: {
    type: String,
    default: ''
  },
  // 餐厅图片列表
  photoList: {
    type: [photoSchema]
  },
  // 是否品牌馆餐厅
  isPremium: {
    type: Boolean,
    default: true
  },
  // 是否支持准时达
  isOnTime: {
    type: Boolean,
    default: true
  },
  // 餐厅整体营业状态
  // 0	餐厅关闭
  // 1	餐厅营业中
  status: {
    type: Number,
    required: [true, '请选择营业状态']
  },
  // 营业时间
  servingTime: {
    type: [servingTimeSchema],
    required: [true, '请至少填写一个营业时间']
  },
  // 餐厅地址
  addressText: {
    type: String,
    required: [true, '请填写餐厅地址']
  },
  // 经度
  latitude: {
    type: Number,
    required: [true, '请选择餐厅经度']
  },
  // 纬度
  longitude: {
    type: Number,
    required: [true, '请选择餐厅纬度']
  },
  // 最近一个月订单量
  // recentOrderNum: Number,
  // 最近一个月美食销量
  // recentFoodPopularity: Number,
  // 店铺联系方式，多个用逗号分开
  phoneList: {
    type: String,
    required: [true, '请填写联系方式']
  },
  // 起送价
  deliverAmount: {
    type: Number,
    required: [true, '请填写起送价']
  },
  // 配送费
  agentFee: {
    type: Array,
    required: [true, '请填写配送费']
  },
  // 免配送费的最低消费额度，例如，订单超过50元免配送费
  noAgentFeeTotal: {
    type: Number,
    required: [true, '请填写免配送费的最低消费额度']
  }
}, {
  timestamps: true
});

module.exports = ShopSchema;