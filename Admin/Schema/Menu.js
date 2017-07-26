let mongoose = require('mongoose');

// 管理员列表
let MenuSchema = mongoose.Schema({
  // 栏目名
  title: {
    type: String,
    required: [true, '请填写栏目名']
  },
  // 上一级栏目的id，根栏目id为0
  parent_id: {
    type: String,
    default: 0
  },
  // id路径
  id_path: {
    type: String,
    required: [true, '请填写密码']
  },
  // 该栏目对应的url，在前端会用到该url
  url: {
    type: String
  },
  // 该栏目是否显示，如果不显示，则子级栏目全部不显示
  state: {
    type: Boolean,
    default: true
  },
  // 排序
  sort: {
    type: String,
    default: 10000
  }
}, {
  timestamps: true
});

module.exports = MenuSchema;
