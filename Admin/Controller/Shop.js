let Shop = require('../Model/Shop');
let utils = require('../Public/javascripts/utils');
let express = require('express');
let router = express.Router();
let assert = require('assert');

router.route('/')
// 查询商家列表
  .get((req, res) => {
    Shop.find({}, (err, shop) => {
      if (err) {
        return res.send({
          result: 0,
          error: err
        });
      }

      res.send(shop);
    });
  })
  // 新增商家
  .post((req, res) => {
    let collection = new Shop(req.body);

    // 验证参数是否正确
    let err = collection.validateSync();
    if (err) {
      return res.send({
        result: null,
        error: utils.validateErrors(err)[0]
      });
    }

    // 查找餐厅名称是否重复
    Shop.findOne({name: collection.name}, (err, shop) => {
      if (err) {
        return res.send({
          result: null,
          error: {
            code: err.code,
            message: err.errmsg
          }
        });
      }

      // 如果餐厅名称重复
      if (shop) {
        res.send({
          result: null,
          error: {
            message: '餐厅名称重复'
          }
        });
      } else {
        // 餐厅名称没有重复就入库
        collection.save((err, data) => {
          if (err) {
            return res.send({
              result: null,
              error: {
                code: err.code,
                message: err.errmsg
              }
            });
          }

          res.send({
            result: data,
            error: null
          });
        });
      }
    });
  });

// 每条商家分类
router.route('/:_id')
// 修改
  .put((req, res) => {
    Shop.findByIdAndUpdate(req.params._id, {$set: req.body}, {new: true, runValidators: true}, (err, result) => {
      if (err) {
        // 如果是商家参数校验错误
        if (err.errors) {
          return res.send({
            result: null,
            error: utils.validateErrors(err)[0]
          });
        } else if (err.code) {
          // 如果是商家名称重复等非validate错误
          let code = err.code;
          let msg = err.errmsg;

          if (code === 11000) {
            msg = '商家名称重复';
          }

          return res.send({
            result: null,
            error: {
              code: code,
              message: msg
            }
          });
        }
      }

      // 找不到指定_id的记录
      if (!result) {
        return res.send({
          result: null,
          error: {
            message: '修改失败，未找到该记录'
          }
        });
      }

      // 成功，返回修改后的记录
      res.send({
        result: result,
        error: null
      });
    });
  })
  // 删除
  .delete((req, res) => {
    Shop.remove({_id: req.params._id}, (err, result) => {
      if (err) {
        return res.send({
          result: null,
          error: err
        });
      }

      res.send({
        result: result,
        error: null
      });
    });
  });

module.exports = router;