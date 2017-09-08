let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// 管理员列表
let MenuSchema = Schema({
  // 栏目名
  name: {
    type: String,
    unique: true,
    required: [true, '请填写栏目名']
  },
  // 上一级栏目的id，根栏目id为0
  parent_id: {
    type: Schema.Types.Mixed,
    default: 0
  },
  // id路径，
  // 上级目录是根目录的情况下(parent_id=0)，id_path与本身的_id相同
  id_path: {
    type: String
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
  order: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = MenuSchema;
