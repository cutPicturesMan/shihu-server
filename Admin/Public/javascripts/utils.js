const utils = {
  // 验证错误列表
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
  }
};

module.exports = utils;