let fs = require('fs');

const utils = {
  // validate错误列表
  validateErrors (error = {}) {
    // 错误对象
    let errors = error.errors || {};
    let errs = [];

    // 循环错误对象的键组成的数组
    Object.keys(errors).forEach((value) => {
      errs.push({
        code: errors[value].name,
        message: errors[value].message
      });
    });

    return errs;
  },
  //检测文件或者文件夹存在 nodeJS
  fsExistsSync (path) {
    try{
      fs.accessSync(path);
    }catch(e){
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
    let thumbName = `${new Date().getTime()}_${name}_small.${extension}`;

    return {
      fileName: fileName,
      thumbName: thumbName
    }
  },
  /**
   * 将时间戳格式化为时间 '2017-05-26 09:06:03'
   * @param date 日期，默认为今天
   * @param space 日期和时间的分割符，默认为空格，'2017-05-26 09:06:03'
   * @param dateSplit 日期分割符，'2017-05-26'，'2017_05_26'
   * @param timeSplit 时间分割符，'09:06:03'，'09-06-03'
   * @returns {string} '2017-05-26 09:06:03'
   */
  formatDate(date = new Date(), space = ' ', dateSplit = '-', timeSplit = ':'){
    return `${this.formatDateToYMD(date, dateSplit)}${space}${this.formatDateToHMS(date, timeSplit)}`;
  },
  /**
   * 将时间戳转为日期 '2017-05-26'
   * @param date 日期，默认为今天
   * @param line 日期分割符，'2017-05-26'，'2017_05_26'
   * @returns {string} '2017-05-26'
   */
  formatDateToYMD(date = new Date(), split = '-'){
    let YYYY = date.getFullYear();
    let MM = date.getMonth() + 1;
    let DD = date.getDate();

    MM = (MM.toString().length < 2) ? ('0' + MM) : MM;
    DD = (DD.toString().length < 2) ? ('0' + DD) : DD;

    return `${YYYY}${split}${MM}${split}${DD}`;
  },
  /**
   * 将时间戳转为具体时间 '09:06:03'
   * @param date 日期，默认为今天
   * @param line 时间分割符，'09:06:03'，'09-06-03'
   */
  formatDateToHMS(date = new Date(), split = ':'){
    let HH = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    HH = (HH.toString().length < 2) ? ('0' + HH) : HH;
    mm = (mm.toString().length < 2) ? ('0' + mm) : mm;
    ss = (ss.toString().length < 2) ? ('0' + ss) : ss;

    return `${HH}${split}${mm}${split}${ss}`;
  }
};

module.exports = utils;