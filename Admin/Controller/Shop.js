let Shop = require('../Model/Shop');
let utils = require('../Public/javascripts/utils');
let express = require('express');
let router = express.Router();
let assert = require('assert');

router.route('/')
// 查询商家列表
  .get((req, res) => {
    let {
      name = '',
      sort = 'createAt',
      order = -1,
      page,
      limit
    } = req.query;

    // 页码，默认第一页
    page = parseInt(page) || 1;
    // 每页显示多少条，默认10条
    limit = parseInt(limit) || 10;
    // 排序，-1为倒叙desc，1为正序asc
    let sortObj = {};
    sortObj[sort] = order;

    console.log(sortObj);
    let skip = (page - 1) * limit;

    Shop.find({
      name: new RegExp(name)
    })
      .limit(limit)
      .skip(skip)
      .sort(sortObj)
      .exec((err, shop) => {
        // 查询出错
        if (err) {
          return res.send({
            result: null,
            error: err
          });
        }

        // 没找到符合关键字的店铺
        if (!shop) {
          return res.send({
            result: null,
            error: {
              message: '无符合条件的店铺'
            }
          });
        }

        res.send({
          result: shop,
          error: null
        });
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

router.route('/:_id')
// 根据_id查询某个店铺
  .get((req, res) => {
    Shop.findById(req.params._id, (err, shop) => {
      if (err) {
        // 传递非法_id
        if (err.name === 'CastError') {
          return res.send({
            result: null,
            error: {
              message: '店铺_id格式错误'
            }
          });
        } else {
          // 其它错误
          return res.send({
            result: null,
            error: err
          });
        }
      }

      // 没有找到店铺
      if (!shop) {
        return res.send({
          result: null,
          error: {
            message: '经查询无此店铺'
          }
        });
      }

      // 找到店铺
      res.send({
        result: shop,
        error: null
      });
    });
  })
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