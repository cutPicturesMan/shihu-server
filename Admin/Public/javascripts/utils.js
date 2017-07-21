let fs = require('fs');

const utils = {
  /**
   * validate错误列表
   * @param error
   * @returns {Array}
   */
  validateErrors (err = {}) {
    // 错误对象
    let errors = err.errors || {};
    let errArr = [];

    // 循环错误对象的键组成的数组
    Object.keys(errors).forEach((value) => {
      errArr.push(this.handleError(errors[value]));
    });

    return errArr;
  },
  /**
   * 处理错误，可能的错误如下
   * 1、字段类型出错
   * 2、validate验证时出错，比如必须字段未填，邮箱不符合格式等...
   * @param err
   * @returns {
   *    code: "CastError",
   *    message: "错误信息"
   * }
   */
  handleError (err) {
    let error = null;

    // 类型出错
    if (err.name === 'CastError') {
      error = {
        code: err.name,
        message: `字段${err.path}的数据类型出错，期待的数据类型为${err.kind}。传入的值为${err.value}`
      };
    } else {
      // 其它错误
      error = err;
    }

    return error;
  },
  //检测文件或者文件夹是否存在 nodeJS
  fsExistsSync (path) {
    try {
      fs.accessSync(path);
    } catch (e) {
      return false;
    }
    return true;
  },
  /**
   * 将时间戳与上传文件名组合，返回新生成的文件名以及相应的缩略图名称
   * @param file，文件名，如'food.cake.jpg'
   * @returns {{fileName: string, thumbName: string}}
   * {
   *    fileName: 1499225675267_food.cake.jpg
   *    thumbName: 1499225675267_food.cake_small.jpg
   * }
   */
  generateUploadFileName (originalname = '') {
    // 分割之后的文件名数组
    let originalnameArr = originalname.split('.');
    // 去掉扩展名之后的纯文件名，'food.cake.jpg' -> 'food.cake'
    let name = originalname.slice(0, originalname.lastIndexOf('.'));
    // 文件的扩展名，'.jpg'
    let extension = originalnameArr[originalnameArr.length - 1];

    // 文件名
    let fileName = `${new Date().getTime()}_${name}.${extension}`;
    // 缩略图
    let thumbName = `${new Date().getTime()}_${name}_thumb.${extension}`;

    return {
      fileName: fileName,
      thumbName: thumbName
    };
  },
  /**
   * 将时间戳格式化为时间 '2017-05-26 09:06:03'
   * @param time 日期，默认为今天
   * @param format 格式化后的排版
   * @returns {string}
   */
  formatDate (time = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
    var obj = {
      YYYY: time.getFullYear(),
      MM: ('0' + (time.getMonth() + 1)).slice(-2),
      DD: ('0' + time.getDate()).slice(-2),
      HH: ('0' + time.getHours()).slice(-2),
      mm: ('0' + time.getMinutes()).slice(-2),
      ss: ('0' + time.getSeconds()).slice(-2),
      w: ['日', '一', '二', '三', '四', '五', '六'][time.getDay()],
      YY: ('' + time.getFullYear()).slice(-2),
      M: time.getMonth() + 1,
      D: time.getDate(),
      H: time.getHours(),
      m: time.getMinutes(),
      s: time.getSeconds()
    };
    return format.replace(/([a-z]+)/ig, function ($1) {return obj[$1];});
  }
};

module.exports = utils;