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
  /**
   * 将时间戳转为2017-05-26
   * @param date 日期，默认为今天
   * @param line 日期分割符，2017-05-26，2017_05_26
   * @returns {string}
   */
  formatDateToYMD(date = new Date(), line = '-'){
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();

    m = (m.toString().length < 2) ? ('0' + m) : m;
    d = (d.toString().length < 2) ? ('0' + d) : d;

    return `${y}${line}${m}${line}${d}`;
  }
};

module.exports = utils;