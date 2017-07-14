let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// 店铺图片列表
let photoSchema = Schema({
  imgUrl: {
    type: String,
    default: ''
  },
  thumbUrl: {
    type: String,
    default: ''
  }
}, {
  _id: false
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
}, {
  _id: false
});

// 店铺模式
let ShopSchema = Schema({
  // 餐厅名称
  name: {
    type: String,
    unique: true,
    required: [true, '请填写餐厅名称']
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
  // 店铺联系方式，多个用逗号分开
  phone: {
    type: String,
    required: [true, '请填写联系方式']
  },
  // 营业时间
  servingTime: {
    type: [servingTimeSchema],
    required: [true, '请至少选择一个营业时间段'],
    default: [{
      begin: "00:00",
      end: "23:55"
    }]
  },
  // 餐厅描述
  description: {
    type: String,
    default: ''
  },
  // 餐厅Logo地址
  // 如果没有，用默认图片替代
  logoUrl: {
    type: String,
    default: ''
  },
  // 餐厅图片列表
  photoList: {
    type: [photoSchema]
  },
  // 餐厅整体营业状态
  // 0	餐厅关闭
  // 1	餐厅营业中
  isOpen: {
    type: Number,
    default: 1
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
  // 最近一个月订单量
  // recentOrderNum: Number,
  // 最近一个月美食销量
  // recentFoodPopularity: Number,
  // 起送价
  deliverAmount: {
    type: Number,
    default: 20
  },
  // 配送费，默认0元
  agentFee: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = ShopSchema;