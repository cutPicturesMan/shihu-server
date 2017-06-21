let Store = require('../Model/Store');

let express = require('express');
let router = express.Router();

router.route('/')
  // 查询商家列表
  .get((req, res) => {
    console.log(req.body);
    console.log(req.query.limit);
    console.log(typeof req.query.limit);

    Store.find({}, (err, stores) => {
      if (err) {
        return res.send({
          result: 0,
          msg: err
        });
      }

      res.send(stores);
    });
  })
  // 新增
  .post((req, res) => {
    let data = req.body;

    let category = new Store({
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

router.route('/:id')
  .get((req, res)=>{
    console.log(1);
    res.send({
      title: 'id'
    });
  });

router.route('/aaa')
  .get((req, res)=>{
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