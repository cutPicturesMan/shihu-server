let Product = require('../Model/Product');

let express = require('express');
let app = express();

// 商品列表
app.get((req, res) => {
    StoreCategory.find({}, (err, categories) => {
      if (err) {
        return res.send({
          result: 0,
          msg: err
        });
      }

      res.send(categories);
    });
  })

// 新增
app.post((req, res) => {
    productService.getShopCategories(result.authorizedShops[0].id)
      .then(result => {
        console.log(result[1].id);
        productService.createItem(526391258, {
          "name": "白切鸡3",
          "description": "香脆可口，外焦里嫩",
          "specs": [
            {
              "specId": 72970000222,
              "name": "大份",
              "price": 18,
              "stock": 9000,
              "maxStock": 10000,
              "packingFee": 1,
              "onShelf": 1,
              "extendCode": "1234567893",
              "barCode": "X148948686356666",
              "weight": 123,
              "activityLevel": 1
            }
          ]
        })
          .then(result => {
            console.log(result)
            res.send(result);
          })
          .catch(error => {
            console.warn(error)
          })
        console.log(result)
      })
      .catch(error => {
        console.warn(error)
      })
  });

module.exports = app;
