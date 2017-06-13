let Store = require('../models/Store');
let StoreCategory = require('../models/StoreCategory');

let express = require('express');
let router = express.Router();

router.route('/aaa')
  .get((req, res)=>{
    res.send({
      title: 'zz'
    });
  });

// 查询商家分类名是否唯一
router.route('/categoryName')
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
          msg: '该商家分类名称可以使用'
        });
      }
    });
  });

// 商家分类
router.route('/category')
// 查询
  .get((req, res) => {
    StoreCategory.find({}, (err, categorys) => {
      if (err) {
        return res.send({
          result: 0,
          msg: err
        });
      }

      res.send(categorys);
    });
  })
  // 新增
  .post((req, res) => {
    let data = req.body;

    let category = new StoreCategory({
      name: data.name
    });

    category.save((err) => {
      if (err) {
        return res.send({
          result: 0,
          msg: err
        });
      }

      res.send({
        result: 1,
        msg: '新增成功'
      });
    });
  });

// 每条商家分类
router.route('/category/:_id')
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