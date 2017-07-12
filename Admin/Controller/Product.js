let express = require('express');
let app = express();
let utils = require('../Public/javascripts/utils');

let Product = require('../Model/Product');

let {
  eleme,
  config,
  callback_url,
  oAuthClient
} = require('../Public/javascripts/eleme');

// 商品列表
// app.get('/', (req, res) => {
//     StoreCategory.find({}, (err, categories) => {
//       if (err) {
//         return res.send({
//           result: 0,
//           msg: err
//         });
//       }
//
//       res.send(categories);
//     });
//   })

app.get('/', (req, res) => {
  var rpcClient = new eleme.RpcClient(req.session.token, config);
  var productService = new eleme.ProductService(rpcClient);
  console.log(req.session);
  productService.getItem(264473854798)
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(error => {
      console.warn(error);
    });
});

// 新增
app.get('/create', (req, res) => {
  var rpcClient = new eleme.RpcClient(req.session.token, config);
  var productService = new eleme.ProductService(rpcClient);
  console.log(req.session);
  productService.getShopCategories(req.session.authorizedShops[0].id)
    .then(result => {
      console.log(result[1].id);
      productService.createItem(526391258, {
        'name': '白切鸡5',
        'description': '香脆可口，外焦里嫩',
        'specs': [
          {
            'specId': 72970000222,
            'name': '大份',
            'price': 18,
            'stock': 9000,
            'maxStock': 10000,
            'packingFee': 1,
            'onShelf': 1,
            'extendCode': '1234567000',
            'barCode': 'X148948686356666',
            'weight': 123,
            'activityLevel': 1
          },
          {
            'specId': 72970000222,
            'name': '中份',
            'price': 9,
            'stock': 2,
            'maxStock': 5,
            'packingFee': 1,
            'onShelf': 1,
            'extendCode': '1234567001',
            'barCode': 'X148948686356666',
            'weight': 1,
            'activityLevel': 1
          }
        ]
      })
        .then(result => {
          console.log(result);
          res.send(result);
        })
        .catch(error => {
          console.warn(error);
        });
      console.log(result);
    })
    .catch(error => {
      console.warn(error);
    });
});

// 新增
app.get('/update', (req, res) => {
  var rpcClient = new eleme.RpcClient(req.session.token, config);
  var productService = new eleme.ProductService(rpcClient);
  console.log(req.session);
  productService.getShopCategories(req.session.authorizedShops[0].id)
    .then(result => {
      console.log(result[1].id);
      productService.updateItem(661812686, 526391258, {
        'name': '白切鸡4',
        'description': '香脆可口，外焦里嫩',
        'specs': [
          {
            'specId': 688689031,
            'name': '大份',
            'price': 18,
            'stock': 9000,
            'maxStock': 10000,
            'packingFee': 1,
            'onShelf': 1,
            'extendCode': '1234567894',
            'barCode': 'X148948686356666',
            'weight': 123,
            'activityLevel': 1
          },
          {
            'name': '中份',
            'price': 18,
            'stock': 1,
            'maxStock': 3,
            'packingFee': 1,
            'onShelf': 1,
            'extendCode': '1234567895',
            'barCode': 'X148948686356666',
            'weight': 123,
            'activityLevel': 1
          }
        ]
      })
        .then(result => {
          console.log(result);
          res.send(result);
        })
        .catch(error => {
          console.warn(error);
        });
      console.log(result);
    })
    .catch(error => {
      console.warn(error);
    });
});

// 新增商品
app.post('/create', (req, res) => {
  let collection = new Product(req.body);

  // 验证参数是否正确
  collection.validate((err) => {
    if (err) {
      return res.send({
        result: null,
        error: utils.validateErrors(err)[0]
      });
    }

    // 查询商品名称是否重复
    Product.findOne({name: req.body.name}, (err, product) => {
      if(product){
        return res.send({
          result: null,
          error: {
            message: "商品名称重复"
          }
        });
      }

      // 保存商品
      collection.save((err, data) => {
        if (err) {
          return res.send({
            result: null,
            error: {
              message: err
            }
          });
        }

        // 返回数据
        res.send({
          result: data,
          error: null
        });
      });
    });
  });
});

// 修改商品
app.post('/update', (req, res) => {
  let collection = new Product(req.body);

  // 验证参数是否正确
  collection.validate((err) => {
    if (err) {
      return res.send({
        result: null,
        error: utils.validateErrors(err)[0]
      });
    }

    // 查询商品名称是否重复
    // Product.findOne({name: req.body.name}, (err, product) => {
    //   if(product){
    //     return res.send({
    //       result: null,
    //       error: {
    //         message: "商品名称重复"
    //       }
    //     });
    //   }
    //
    //   // 保存商品
    //   collection.save((err, data) => {
    //     if (err) {
    //       return res.send({
    //         result: null,
    //         error: {
    //           message: err
    //         }
    //       });
    //     }
    //
    //     // 返回数据
    //     res.send({
    //       result: data,
    //       error: null
    //     });
    //   });
    // });
  });
});

module.exports = app;
