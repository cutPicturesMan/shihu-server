let mongoose = require('mongoose');

// 管理员列表
let ManageSchema = mongoose.Schema({
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
  // 权限
  // 1，普通管理员，1）可对自己创建的条目进行增删改查；2）只能查看，不能增删改管理员
  // 2，超级管理员，1）可以增删改查普通管理员。2）可以新建超级管理员。3）可对所有人的创建的条目进行增删改查
  auth: {
    type: Number,
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

module.exports = ManageSchema;

// list: [{
//   _id: 10702,
//   title: '后台管理',
//   parent_id: 0,
//   id_path: '10702',
//   state: 1
// }, {
//   _id: 10900,
//   title: '目录树列表',
//   parent_id: 10702,
//   id_path: '10702,10900',
//   state: 1
// }, {
//   _id: 11000,
//   title: '权限列表',
//   parent_id: 10702,
//   id_path: '10702,11000',
//   state: 1
// }]
