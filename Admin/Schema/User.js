let mongoose = require('mongoose');

// 用户
let StoreCategorySchema = mongoose.Schema({
  // 用户名
  username: {
    type: String,
    required: [true, '请填写用户名']
  },
  // 密码
  password: {
    type: String,
    required: [true, '请填写密码']
  },
  // 最后登录的时间
  last_login: {
    type: String,
    default: new Date()
  },
  // 最后登录的ip
  last_ip: String
}, {
  timestamps: true
});

module.exports = StoreCategorySchema;
