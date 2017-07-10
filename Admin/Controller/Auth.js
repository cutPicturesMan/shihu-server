let express = require('express');
let app = express();

// 获取列表权限
app.get('getList')
  .then((req, res)=>{

  });

// 修改权限列表
app.post('modify')
  .then((req, res)=>{

  });

module.exports = app;