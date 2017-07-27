let Menu = require('../Model/Menu');

let utils = require('../Public/javascripts/utils');
let express = require('express');
let router = express.Router();
let assert = require('assert');

router.route('/')
// 查询栏目列表
  .get((req, res) => {
    // page=1&limit=10
    let {
      page,
      limit
    } = req.query;

    // 分页
    let skip = (page - 1) * limit;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    Menu
      .find()
      .count((err, count) => {
        // 查询出错
        if (err) {
          return res.send({
            result: null,
            error: err
          });
        }

        Menu
          .find()
          .limit(limit)
          .skip(skip)
          .sort({
            'id_path': 1
          }, {
            'order': 1
          })
          .exec((err, menu) => {
            // 查询出错
            if (err) {
              return res.send({
                result: null,
                error: err
              });
            }

            res.send({
              result: {
                rows: menu,
                total: count
              },
              error: null
            });
          });
      });
  })
  // 新增栏目
  .post((req, res) => {
    let collection = new Menu(req.body);

    // 如果是非根栏目
    if (collection.parent_id !== 0) {
      let id_path = collection.id_path.split(',');
      let order = [];
      let length = id_path.length;

      // 将本条数据的_id添加到id_path的末尾
      id_path.push(collection._id);
      collection.id_path = id_path.join(',');

      // 生成各栏目排序顺序，例如三级栏目排序为 1000, 1000, 1000
      for(let i = 0; i < length; i++){
        order.push(1000);
      }
      collection.order = order.join(',');
    } else {
      // 否则，id_path就直接等于本条数据的_id
      collection.id_path = collection._id;
      collection.order = '1000';
    }

    // 在save操作前提前验证参数是否正确
    let err = collection.validateSync();
    if (err) {
      return res.send({
        result: null,
        error: utils.validateErrors(err)[0]
      });
    }

    // 查询栏目名称是否重复
    Menu.findOne({name: collection.name}, (err, Menu) => {
      if (err) {
        return res.send({
          result: null,
          error: {
            code: err.code,
            message: err.errmsg
          }
        });
      }

      // 如果栏目名称重复
      if (Menu) {
        res.send({
          result: null,
          error: {
            message: '栏目名称重复'
          }
        });
      } else {
        // 栏目名称没有重复就入库
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
    Menu
      .findById(req.params._id)
      .exec((err, Menu) => {
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

        // 找到店铺
        res.send({
          result: Menu,
          error: null
        });
      });
  })
  // 修改
  .put((req, res) => {
    Menu.findByIdAndUpdate(req.params._id, {$set: req.body}, {new: true, runValidators: true}, (err, result) => {
      if (err) {
        // 如果是栏目参数校验错误
        if (err.errors) {
          return res.send({
            result: null,
            error: utils.validateErrors(err)[0]
          });
        } else if (err.code) {
          // 如果是栏目名称重复等非validate错误
          let code = err.code;
          let msg = err.errmsg;

          if (code === 11000) {
            msg = '栏目名称重复';
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
  // 单个删除
  .delete((req, res) => {
    Menu.remove({_id: req.params._id}, (err, result) => {
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

router
// 批量删除
  .post('/delete_batch', (req, res) => {
    console.log();
    Menu.remove({
      _id: {
        $in: req.body
      }
    }, (err, result) => {
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