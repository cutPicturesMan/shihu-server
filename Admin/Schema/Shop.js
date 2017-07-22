let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// 店铺图片列表
let photoSchema = Schema({
  url: {
    type: String,
    default: ''
  },
  thumb_url: {
    type: String,
    default: ''
  }
}, {
  _id: false
});

// 营业时间
let servingTimeSchema = Schema({
  // 星期几
  day: {
    type: [Number],
    required: [true, '请选择星期']
  },
  // 每天的具体营业时间
  ranges: {
    type: Array,
    required: [true, '请选择每日营业时间段']
  },
}, {
  _id: false
});

// 店铺电话
let phoneSchema = Schema({
  phone: {
    type: Number
  }
})

// 店铺模式
let ShopSchema = Schema({
  // 餐厅名称
  name: {
    type: String,
    unique: true,
    required: [true, '请填写餐厅名称']
  },
  // 餐厅地址
  address_text: {
    type: String,
    required: [true, '请填写餐厅地址']
  },
  // 经纬度
  address_point: {
    type: String,
    required: [true, '请选择餐厅经纬度']
  },
  // 店铺联系方式
  phone_list: {
    type: [phoneSchema],
    required: [true, '请至少填写一个联系方式']
  },
  // 营业时间
  serving_time: {
    type: [servingTimeSchema],
    required: [true, '请至少选择一个营业时间'],
    default: [{
      day: [1, 2, 3, 4, 5, 6, 7],
      ranges: [["00:00", "23:55"]]
    }]
  },
  // 餐厅描述
  description: {
    type: String,
    default: ''
  },
  // 餐厅Logo地址
  // 如果没有，用默认图片替代
  logo_url: {
    type: photoSchema,
    default: {
      url: 'logo.png',
      thumb: 'logo.png'
    }
  },
  // 餐厅图片列表
  photo_list: {
    type: [photoSchema]
  },
  // 餐厅整体营业状态
  // 0	餐厅关闭
  // 1	餐厅营业中
  is_open: {
    type: Number,
    default: 1
  },
  // 是否品牌馆餐厅
  is_premium: {
    type: Boolean,
    default: true
  },
  // 是否支持准时达
  is_ontime: {
    type: Boolean,
    default: true
  },
  // 最近一个月订单量
  // recentOrderNum: Number,
  // 最近一个月美食销量
  // recentFoodPopularity: Number,
  // 起送价
  deliver_amount: {
    type: Number,
    default: 20
  },
  // 配送费，默认0元
  agent_fee: {
    type: Number,
    default: 0
  },
  categories: [{
    type: Schema.Types.ObjectId, ref: 'ProductCategory'
  }]
}, {
  timestamps: true
});

module.exports = ShopSchema;