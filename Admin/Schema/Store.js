let mongoose = require('mongoose');

let StoreSchema = mongoose.Schema({
  // 店铺 ID
  restaurant_id: Schema.Types.ObjectId,
  // 餐厅名称
  restaurant_name: String,
  // 餐厅所属分类
  category: Number,
  // 餐厅描述
  description: String,
  // 餐厅Logo地址
  image_url: String,
  // 餐厅整体营业状态
  // 1	餐厅营业中
  // 2	餐厅关闭
  total_status: Number,
  // 营业时间
  serving_time: Array,
  // 最近一个月订单量
  recent_order_num: Number,
  // 最近一个月美食销量
  recent_food_popularity: Number,
  // 店铺联系方式
  phone_list: Array,
  // 起送价
  deliver_amount: Number,
  // 免配送费的最低消费额度
  no_agent_fee_total: Number,
  // 配送费
  agent_fee: Number,
  // 餐厅地址
  address_text: String,
  // 经度
  latitude: Number,
  // 纬度
  longitude: Number,
  // 餐厅图片列表
  photo_list: Array,
  // 是否品牌馆餐厅
  is_premium: Boolean,
  // 是否支持准时达
  is_on_time: Boolean
}, {
  timestamps: true
});

StoreSchema.pre('save', (res, req) => {
  console.log(111);
});

module.exports = StoreSchema;