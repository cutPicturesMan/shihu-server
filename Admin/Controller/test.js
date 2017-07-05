let express = require('express');
let mongoose = require('mongoose');
let multer = require('multer');
let path = require('path');
let fs = require('fs');
let gm = require('gm');
let utils = require('../Public/javascripts/utils.js');

let Schema = mongoose.Schema;
let router = express.Router();
// 上传到服务器Upload文件夹下的文件列表
let fileList = [];

// 上传错误
const errorMessages = {
  'LIMIT_PART_COUNT': '上传字段和上传文件的总和超出限制',
  'LIMIT_FILE_SIZE': '上传文件大小超过限制',
  'LIMIT_FILE_COUNT': '上传文件数量超过限制',
  'LIMIT_UNEXPECTED_FILE': '上传文件的字段名称未填写',
  'LIMIT_FIELD_KEY': '上传字段名称过长',
  'LIMIT_FIELD_VALUE': '上传字段值过长',
  'LIMIT_FIELD_COUNT': '上传字段数量超过限制'
};

let storage = multer.memoryStorage();
// let storage = multer.diskStorage({
//   // 存放目录，在./Admin/Upload下，以日期来创建文件夹，如：./Admin/Upload/20170526
//   destination: (req, file, cb) => {
//     // 今天日期
//     let date = utils.formatDateToYMD(undefined, '');
//     let path = './Upload/' + date;
//
//     // 如果存在以今天日期命名的文件夹，则直接把图片存到该文件夹
//     if (utils.fsExistsSync(path)) {
//       cb(null, path);
//     } else {
//       // 否则新建一个文件夹
//       fs.mkdir(path);
//     }
//   },
//   // 文件名：时间戳_文件名.后缀。multer生成的文件默认没有后缀名，因此要手动配置
//   filename: function (req, file, cb) {
//     let {fileName, thumbName} = utils.generateUploadFileName(file.originalname);
//     // 今天日期
//     let date = utils.formatDateToYMD(undefined, '');
//
//     fileList.push({
//       imgUrl: `${date}/${fileName}`,
//       thumbUrl: `${date}/${thumbName}`
//     });
//
//     cb(null, fileName);
//   }
// });

// 上传文件的配置
let uploadConfig = {
  // 存储设置
  storage: storage,
  limits: {
    // 每个文件大小限制为2M
    fileSize: (2 * 1024 * 1024),
    // 最大上传8张
    files: 8
  },
  // 文件类型过滤
  fileFilter: (req, file, cb) => {
    let filter = 'jpg|jpeg|png';
    // 获取文件后缀
    let result = ~filter.indexOf(file.mimetype.split('/')[1]);

    // 如果图片类型在允许的列表中，则接收
    if (!!result) {
      cb(null, true);
    } else {
      // 否则，不接收，也不会报错
      cb(null, false);
    }
  }
};

let upload = multer(uploadConfig).array('ImgList', 12);

router.route('/')
  .get((req, res) => {
    gm('./Upload/20170704/1.jpg')
      .size(function (err, size) {
        if (!err)
          console.log(size.width);
        console.log(size.width > size.height ? 'wider' : 'taller than you');
      });
    // .resize(240, 240)
    // // .noProfile()
    // .write('12345.jpg', function (err) {
    //   if (!err) console.log('done');
    // });

    res.send({
      result: '成功'
    });
    console.log('````````');
  })
  .post((req, res) => {
    upload(req, res, (err) => {
      if (err) {
        let error = {
          code: err.code,
          message: '上传文件发生错误：' + err.code
        };
        // 将错误提示转为中文
        if (err.code in errorMessages) {
          error.message = errorMessages[err.code];
        }
        return res.send({
          result: null,
          error: error
        });
      }
      // console.log('+++++++++++++++++++++');
      // console.log(req.files);
      req.files.forEach((file) => {
        // 文件名：时间戳_文件名.后缀。multer生成的文件默认没有后缀名，因此要手动配置
        let {fileName, thumbName} = utils.generateUploadFileName(file.originalname);
        // 今天日期
        let date = utils.formatDateToYMD(undefined, '');
        let imgUrl = `${date}/${fileName}`;
        let thumbUrl = `${date}/${thumbName}`;

        fileList.push({
          imgUrl: imgUrl,
          thumbUrl: thumbUrl
        });

        gm(file.buffer)
          .size((err, size) => {
            console.log('--------------------');
            console.log(size);
          })
          .thumb(240, 240, './Upload/' + thumbUrl, 80, (err)=>{
            console.log(err);
          })
          .write('./Upload/' + imgUrl, (err) => {
            console.log(err);
          });
      });
      // console.log(utils.fsExistsSync('./Upload/' + date + '/' + fileName));

      // gm('./Upload/' + date + '/' + fileName)
      //   .size(function (err, size) {
      //     console.log(err);
      //     if (!err)
      //       console.log(size.width);
      //     console.log(size.width > size.height ? 'wider' : 'taller than you');
      //   })
      //   .write('./Upload/' + fileName, (err) => {
      //     console.log(err);
      //   });

      res.send({
        result: fileList,
        error: null
      });
      // 清空上传文件地址列表
      fileList = [];
    });
  });

module.exports = router;

