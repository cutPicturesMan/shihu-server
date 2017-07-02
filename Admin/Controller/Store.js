let Store = require('../Model/Store');
let utils = require('../Public/javascripts/utils');
let express = require('express');
let router = express.Router();
let assert = require('assert');

router.route('/')
// 查询商家列表
  .get((req, res) => {
    Store.find({}, (err, stores) => {
      if (err) {
        return res.send({
          result: 0,
          error: err
        });
      }

      res.send(stores);
    });
  })
  // 新增商家
  .post((req, res) => {
    let store = new Store(req.body);

    let error = store.validateSync();
    if (error) {
      return res.send({
        result: null,
        error: utils.validateErrors(error)
      });
    }

    Store.findOne({name: store.name}, (err, data) => {
      if (err) {
        return res.send({
          result: null,
          error: {
            code: err.code,
            message: err.errmsg
          }
        });
      }

      if(data){
        res.send({
          result: null,
          error: {
            message: '餐厅名称重复'
          }
        });
      }else{
        store.save((err) => {
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
            result: store,
            error: null
          });
        });
      }
    });
  });

router.route('/:id')
  .get((req, res) => {
    console.log(1);
    res.send({
      title: 'id'
    });
  });

router.route('/aaa')
  .get((req, res) => {
    console.log(2);
    res.send({
      title: 'zz'
    });
  });

// 查询商家名是否唯一
router
  .post('/check_name', (req, res) => {
    let data = req.body;

    Store.findOne({name: data.name}, (err, store) => {
      if (err) {
        return res.send({
          result: 0,
          msg: err
        });
      }

      // 如果有查询到相同的商家分类名称，则返回错误提示
      if (store) {
        res.send({
          result: 0,
          msg: '商家名称重复'
        });
      } else {
        res.send({
          result: 1,
          msg: '该商家名称可以使用'
        });
      }
    });
  });

// 每条商家分类
router.route('/:_id')
// 修改
  .put((req, res) => {
    Store.update({_id: req.params._id}, {name: req.body.name}, (err, result) => {
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
    Store.remove({_id: req.params._id}, (err, result) => {
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