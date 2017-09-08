let StoreCategory = require('../model/shop_category');

let express = require('express');
let router = express.Router();

// 查询商家分类名是否唯一
router.route('/check_name')
  .post((req, res) => {
    let data = req.body;

    StoreCategory.findOne({name: data.name}, (err, category) => {
      if (err) {
        return res.send({
          result: 0,
          msg: err
        });
      }

      // 如果有查询到相同的商家分类名称，则返回错误提示
      if (category) {
        res.send({
          result: 0,
          msg: '商家分类名称重复'
        });
      } else {
        res.send({
          result: 1,
          msg: '商家分类名称可以使用'
        });
      }
    });
  });

// 商家分类
router.route('/')
  // 查询
  .get((req, res) => {
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
  .post((req, res) => {
    var productService = new eleme.ProductService(rpcClient);

    productService.createCategory(result.authorizedShops[0].id, "甜品", "香甜可口哟~")
      .then(result => {
        res.send({
          code: 200,
          result: result
        });
      })
      .catch(error => {
        console.warn(error)
      })
    // let data = req.body;
    //
    // let category = new StoreCategory({
    //   name: data.name
    // });
    //
    // category.save((err) => {
    //   if (err) {
    //     return res.send({
    //       result: 0,
    //       msg: err
    //     });
    //   }
    //
    //   res.send({
    //     result: 1,
    //     msg: '新增成功'
    //   });
    // });
  });

// 每条商家分类
router.route('/:_id')
  // 修改
  .put((req, res) => {
    StoreCategory.update({_id: req.params._id}, {name: req.body.name}, (err, result) => {
      if (err) {
        return res.send({
          result: 0,
          msg: err
        });
      }

      res.send({
        result: 1,
        msg: '操作成功，影响了' + result.nModified + '行'
      });
    });
  })
  // 删除
  .delete((req, res) => {
    StoreCategory.remove({_id: req.params._id}, (err, result) => {
      if (err) {
        return res.send({
          result: 0,
          msg: err
        });
      }

      res.send({
        result: 1,
        msg: '操作成功，影响了' + result.result.n + '行'
      });
    });
  });

module.exports = router;
