let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let StoreSchema = Schema({
  // 店铺 ID
  id: Schema.Types.ObjectId,
  // 餐厅名称
  name: {
    type: String,
    required: [true, '餐厅名称不能为空']
  },
  // 餐厅所属分类
  category: {
    type: Number,
    required: [true, '请选择餐厅分类']
  },
  // 餐厅描述
  description: String,
  // 餐厅Logo地址
  // 如果没有，用默认图片替代
  imageUrl: String,
  // 餐厅整体营业状态
  // 0	餐厅关闭
  // 1	餐厅营业中
  busyLevel: {
    type: Number,
    required: [true, '请选择营业状态']
  },
  // 营业时间
  servingTime: {
    type: Array,
    required: [true, '请至少填写一个营业时间']
  },
  // 最近一个月订单量
  recentOrderNum: Number,
  // 最近一个月美食销量
  recentFoodPopularity: Number,
  // 店铺联系方式
  phoneList: {
    type: Array,
    required: [true, '请至少填写一个联系方式']
  },
  // 起送价
  deliverAmount: {
    type: Number,
    required: [true, '请填写起送价']
  },
  // 免配送费的最低消费额度
  noAgentFeeTotal: {
    type: Number,
    required: [true, '请填写免配送费的最低消费额度']
  },
  // 配送费
  agentFee: {
    type: Array,
    required: [true, '请填写配送费']
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
  // 餐厅图片列表
  photoList: Array,
  // 是否品牌馆餐厅
  isPremium: Boolean,
  // 是否支持准时达
  isOnTime: Boolean
}, {
  timestamps: true
});

StoreSchema.pre('save', function (next) {
  // utils.validateErrors(err)
  // console.log('+++++++++++++');
  // console.log(this);
  next();
});

module.exports = StoreSchema;