let ProductCategory = require('../../model/product/product_category');
let utils = require('../../public/javascripts/utils');

let express = require('express');
let router = express.Router();

// 商品分类
router.route('/')
// 查询所有分类
  .get((req, res) => {
    let {
      name = '',
      shop_id = '',
      date_from = '',
      date_to = '',
      sort = '',
      order = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    // 分页
    let skip = (page - 1) * limit;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    // 查询条件
    let conditionObj = {};
    if (name) {
      conditionObj.name = new RegExp(name);
    }
    if (shop_id) {
      conditionObj.shop_id = shop_id;
    }
    if (date_from && date_to) {
      conditionObj.createdAt = {
        $gt: date_from,
        $lt: date_to
      };
    } else if (date_from) {
      conditionObj.createdAt = {
        $gt: date_from
      };
    } else if (date_to) {
      conditionObj.createdAt = {
        $lt: date_to
      };
    }

    // 排序条件
    let sortObj = {};
    if (sort) {
      if (order === 'asc') {
        sortObj[sort] = 1;
      } else {
        sortObj[sort] = -1;
      }
    }

    ProductCategory
      .find(conditionObj)
      .sort(sortObj)
      .limit(limit)
      .skip(skip)
      .exec((err, categories) => {
        if (err) {
          return res.send({
            result: null,
            error: utils.handleError(err)
          });
        }

        setTimeout(() => {
          // 查询结果
          res.send({
            result: categories,
            error: null
          });
        }, 2000);
      });
  })
  // 新增
  .post((req, res) => {
    let collection = new ProductCategory(req.body);

    // 验证参数是否正确
    let err = collection.validateSync();
    if (err) {
      err = utils.validateErrors(err)[0];
      return res.send({
        result: null,
        error: err
      });
    }

    // 查找同一家店铺的商品分类名称是否重复
    ProductCategory
      .findOne({
        name: collection.name,
        shop_id: collection.shop_id
      })
      .exec((err, product) => {
        if (err) {
          return res.send({
            result: null,
            error: {
              code: err.code,
              message: err.errmsg
            }
          });
        }

        // 如果商品分类名称重复
        if (product) {
          return res.send({
            result: null,
            error: {
              message: '商品分类名称重复'
            }
          });
        }

        // 如果商品分类名称没有重复，就写入入库
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
  });

// 每条商家分类
router.route('/:_id')
// 根据_id查询某个店铺
  .get((req, res) => {
    ProductCategory
      .findById(req.params._id)
      .exec((err, category) => {
        if (err) {
          return res.send({
            result: null,
            error: utils.handleError(err)
          });
        }

        // 没有找到商品分类
        if (!category) {
          return res.send({
            result: null,
            error: {
              message: '无此商品分类'
            }
          });
        }

        // 找到商品分类
        res.send({
          result: category,
          error: null
        });
      });
  })
  // 修改
  // 把is_valid字段设置为0，可以让该分类不显示出来，达到类似删除的目的
  .put((req, res) => {
    ProductCategory.update({_id: req.params._id}, req.body, (err, result) => {
      if (err) {
        return res.send({
          result: null,
          error: utils.handleError(err)
        });
      }

      res.send(result);
    });
  });

module.exports = router;
