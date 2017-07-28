let express = require('express');
let _ = require('lodash');
let utils = require('../Public/javascripts/utils');
let Menu = require('../Model/Menu');
let router = express.Router();

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

    // 在save操作前提前验证参数是否正确
    let err = collection.validateSync();
    if (err) {
      return res.send({
        result: null,
        error: utils.validateErrors(err)[0]
      });
    }

    // 查询栏目名称是否重复
    Menu.findOne({name: collection.name}, (err, menu) => {
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
      if (menu) {
        res.send({
          result: null,
          error: {
            message: '栏目名称重复'
          }
        });
      } else {
        // 如果是根栏目
        if (collection.parent_id === 0) {
          // id_path就直接等于本条数据的_id
          collection.id_path = collection._id;
        } else {
          // 否则，将本条数据的_id添加到id_path的末尾
          let id_path = collection.id_path.split(',');
          let length = id_path.length;

          id_path.push(collection._id);
          collection.id_path = id_path.join(',');
        }

        // 排序
        let order = '';
        // 如果是根栏目，则按order正序，去查找同为根栏目(parent_id = 0)中最大的order
        if (collection.parent_id === 0) {
          Menu
            .find({'parent_id': 0})
            .sort({order: 1})
            .exec((err, arr) => {
              if (err) {
                return res.send({
                  result: null,
                  error: {
                    code: err.code,
                    message: err.errmsg
                  }
                });
              }

              // 如果新增栏目是根栏目中的第一个
              if (arr.length === 0) {
                order = '1001';
              } else {
                // 如果不是根栏目中的第一个
                // 那么新增栏目的order等于根栏目中的order最大值 + 1
                let maxItem = arr[arr.length - 1];
                order = parseInt(maxItem.order) + 1;
              }

              collection.order = order;

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
            });
        } else {
          // 否则，按order正序，去查找同一个上级下面的所有数据
          // 1、如果是同级中的第一条数据，order = 父级order + ', 1001'
          // 2、如果不是同级中的第一条数据，order = 同级栏目中最大的order + 1
          Menu
            .find({'id_path': new RegExp(collection.parent_id)})
            .sort({order: 1})
            .exec((err, arr) => {
              if (err) {
                return res.send({
                  result: null,
                  error: {
                    code: err.code,
                    message: err.errmsg
                  }
                });
              }

              // 同一个上级之下的所有数据
              let menu = _.groupBy(arr, 'parent_id');
              // 同级的数据
              let sibling = menu[collection.parent_id];

              // 如果新增栏目是同级中的第一个
              // order = 上级order + ',1001'
              if (!sibling) {
                arr.every(item => {
                  if (item._id.toString() === collection.parent_id) {
                    order = item.order + ',1001';
                    return false;
                  } else {
                    return true;
                  }
                });
              } else {
                // 如果新增栏目不是同级中的第一个
                // 那么新增栏目的order等于同级中的order最大值 + 1
                let maxItem = sibling[sibling.length - 1];
                let orderArr = maxItem.order.split(',');
                // orderArr数组中最后一个order加1
                let lastOrder = parseInt(orderArr[orderArr.length - 1]) + 1;
                orderArr.splice(-1, 1, lastOrder);
                order = orderArr.join(',');
              }

              collection.order = order;

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
            });
        }
      }
    });
  });

router.post('/test', (req, res) => {
  let collection = new Menu(req.body);
  console.log(1);
  // 在save操作前提前验证参数是否正确
  // let err = collection.validateSync();
  // if (err) {
  //   return res.send({
  //     result: null,
  //     error: utils.validateErrors(err)[0]
  //   });
  // }

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