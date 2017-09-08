let mongoose = require('mongoose');
let express = require('express');
let _ = require('lodash');
let utils = require('../../public/javascripts/utils');
let Menu = require('../../model/admin/menu');
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

    Menu.find()
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
            order: 1
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
    Menu.findOne({ name: collection.name }, (err, menu) => {
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
            .find({ parent_id: 0 })
            .sort({ order: 1 })
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
          // 否则，按order正序，去查找上级栏目以及同级所有栏目
          // 1、如果是同级中的第一条数据，order = 父级order + ', 1001'
          // 2、如果不是同级中的第一条数据，order = 同级栏目中最大的order + 1
          Menu
            .find({
              $or: [{
                _id: mongoose.Types.ObjectId(collection.parent_id)
              }, {
                parent_id: collection.parent_id
              }]
            })
            .sort({ order: 1 })
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
                arr.some(item => {
                  if (item._id.toString() === collection.parent_id) {
                    order = item.order + ',1001';
                    return true;
                  } else {
                    return false;
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

// 上移或者下移栏目
// direction: 1为下移，direction：-1为上移
// 只能在同级栏目中切换
router.put('/move_item', (req, res) => {
  let params = req.body;

  // 找到所有同级栏目
  Menu
    .find({
      parent_id: params.parent_id
    })
    .sort({
      order: 1
    })
    .exec((err, menu) => {
      if (err) {
        return res.send({
          result: null,
          error: {
            code: err.code,
            message: err.errmsg
          }
        });
      }

      // 如果数据库中数据只有1条，则无需移动
      if (menu.length === 1) {
        return res.send({
          result: null,
          error: {
            message: '暂无同级栏目，无需移动'
          }
        });
      }

      // 如果数据库中数据有多条，则需要移动
      // 找到本条数据的位置
      let originalIndex = 0;
      menu.some((item, index) => {
        if (item._id.toString() === params._id) {
          originalIndex = index;
          return true;
        } else {
          return false;
        }
      });

      // 如果是上移，且本条数据为第一条，则无需移动
      if (params.direction === -1 && originalIndex === 0) {
        return res.send({
          result: null,
          error: {
            message: '已经是第一条了'
          }
        });
      }
      // 如果是下移，且本条数据为最后一条，则无需移动
      if (params.direction === 1 && originalIndex === (menu.length - 1)) {
        return res.send({
          result: null,
          error: {
            message: '已经是最后一条了'
          }
        });
      }

      // 将本条数据的order字段与目标数据的order字段交换，同时对换二者所有子栏目order字段中的父级部分
      let updateArr = [];

      // 原始栏目
      let original = menu[originalIndex];
      let oid = original._id.toString();
      let oOrder = original.order.split(',');

      // 目标栏目
      let target = menu[originalIndex + params.direction];
      let tid = target._id.toString();
      let tOrder = target.order.split(',');

      // 找到需要对调order的两个栏目以及所有子栏目
      Menu
        .find({
          $or: [{
            id_path: new RegExp(original._id)
          }, {
            id_path: new RegExp(target._id)
          }]
        })
        .exec((err, menu) => {
          if (err) {
            return res.send({
              result: null,
              error: {
                code: err.code,
                message: err.errmsg
              }
            });
          }

          // 根据id_path将数据分成两组
          let arr = _.reduce(menu, (result, item, key) => {
            if (new RegExp(oid).test(item.id_path.toString())) {
              (result[oid] || (result[oid] = [])).push(item)
            } else if (new RegExp(tid).test(item.id_path.toString())) {
              (result[tid] || (result[tid] = [])).push(item)
            }

            return result;
          }, {});

          // 对换order之后的数据
          let updateData = [];

          arr[oid].forEach((item, index)=>{
            let order = item.order.split(',');
            order.splice(0, tOrder.length);
            item.order = tOrder.concat(order).join(',');

            updateData.push(item);
          });
          arr[tid].forEach((item, index)=>{
            let order = item.order.split(',');
            order.splice(0, oOrder.length);
            item.order = oOrder.concat(order).join(',');

            updateData.push(item);
          });

          // 转为map数据结构，在for...of循环中能够得到index序号
          updateData = new Map(updateData.map((item, i) => [i, item]));

          async function loop () {
            for (const [index, item] of updateData) {
              await new Promise((resolve, reject) => {
                // 保存更新order之后的每一条数据
                Menu.findOneAndUpdate(
                  { _id: item._id },
                  { order: item.order },
                  (err, data) => {
                    if (err) {
                      return reject(err);
                    }

                    return resolve();
                  });
              });
            }
          }

          loop().then(() => {
            res.send({
              result: '修改排序成功',
              error: null
            });
          }, (err) => {
            res.send({
              code: err.code,
              message: err.errmsg
            });
          })
        });
    });
})

// 找到上一级下面的所有数据
// Menu
//   .find({
//     id_path: params.parent_id
//   })
//   .sort({
//     order: 1
//   })
//   .exec((err, menu) => {
//     if (err) {
//       return res.send({
//         result: null,
//         error: {
//           code: err.code,
//           message: err.errmsg
//         }
//       });
//     }
//
//     // 找到本条数据的位置
//   });
// })
// ;

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
    Menu.findByIdAndUpdate(
      req.params._id,
      { $set: req.body },
      { new: true, runValidators: true },
      (err, result) => {
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
    Menu.remove({ _id: req.params._id }, (err, result) => {
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