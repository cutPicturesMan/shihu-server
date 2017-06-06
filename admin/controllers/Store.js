let Store = require('../models/Store');

let express = require('express');
let app = express();

// 商家列表
app.get('/list', function (req, res) {

  let list = [{
    id: 1,
    name: '飞利浦旗舰店',
    category: 1,
    categoryName: '护理用品'
  }, {
    id: 2,
    name: '三只松鼠',
    category: 2,
    categoryName: '零食饮料'
  }];

  res.send(list);
});

// 商家分类
app.get('/category', function (req, res) {
  res.send('商家分类页');
});

// 新增店铺
app.post('/storeAdd', function (req, res) {
  console.log(req.body);
  // req.
  // new MerchantList({
  //   name:
  // });
});

// 新增店铺分类
app.post('/categoryAdd', function (req, res) {
  console.log(req.body);

  let feilipu = new MerchantList({
    name: '飞利浦',
    category: 1,
    meta: {
      create: new Date(),
      update: new Date()
    }
  });

  console.log(feilipu);
  feilipu.speak();
});

module.exports = app;