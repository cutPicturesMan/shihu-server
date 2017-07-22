let express = require('express');
let mongoose = require('mongoose');
let multer = require('multer');
let path = require('path');
let fs = require('fs');
let gm = require('gm');
let co = require('co');
let utils = require('../Public/javascripts/utils.js');

let Schema = mongoose.Schema;
let router = express.Router();

// 上传错误
const errorMessages = {
  'LIMIT_PART_COUNT': '上传字段和上传文件的总和超出限制',
  'LIMIT_FILE_SIZE': '上传文件大小超过限制',
  'LIMIT_FILE_COUNT': '上传文件数量超过限制',
  'LIMIT_UNEXPECTED_FILE': '上传文件的字段名称请填写ImgList',
  'LIMIT_FIELD_KEY': '上传字段名称过长',
  'LIMIT_FIELD_VALUE': '上传字段值过长',
  'LIMIT_FIELD_COUNT': '上传字段数量超过限制'
};

let storage = multer.memoryStorage();

// 上传文件的配置
let uploadConfig = {
  // 存储设置
  storage: storage,
  limits: {
    // 每个文件大小限制为5M
    fileSize: (5 * 1024 * 1024),
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

let upload = multer(uploadConfig).array('img_list', 8);

router.route('/')
  .post((req, res) => {
    console.log('接收到请求');
    upload(req, res, (err) => {
      console.log('upload');
      if (err) {
        let error = {
          code: err.code,
          message: '上传文件发生错误：' + err.code
        };
        console.log(error);
        // 如果错误码有对应的中文描述，则将错误提示转为中文
        if (err.code in errorMessages) {
          error.message = errorMessages[err.code];
        }
        return res.send({
          result: null,
          error: error
        });
      }

      // 上传到服务器Upload文件夹下的文件列表
      let fileList = [];
      // 当天日期
      let date = utils.formatDate(new Date(), 'YYYYMMDD');
      // 如果不存在Upload文件夹，则创建一个
      if (!utils.fsExistsSync('./upload')) {
        fs.mkdir('./upload');
      }
      // 如果upload文件夹下不存在今天日期命名的文件夹，则创建一个
      if (!utils.fsExistsSync('./upload/' + date)) {
        fs.mkdir('./upload/' + date);
      }

      co(function * () {
        // 循环内存中的文件列表，将每个文件以及对应的缩略图存储到硬盘上
        for (let i = 0; i < req.files.length; i++) {
          let file = req.files[i];
          // 文件名：时间戳_文件名.后缀。multer生成的文件默认没有后缀名，因此要手动配置
          let {fileName, thumbName} = utils.generateUploadFileName(file.originalname);

          let url = `${date}/${fileName}`;
          let thumb_url = `${date}/${thumbName}`;

          // 最终返回的文件地址列表
          fileList.push({
            url: url,
            thumb_url: thumb_url
          });

          // 缩略图
          yield new Promise((resolve, reject) => {
            gm(file.buffer)
              .thumb(140, 140, './upload/' + thumb_url, 100, 'center', (err, stdout) => {
                console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
                console.log(err);
                if(err){
                  return reject(err);
                }
                resolve(stdout);
              });
          });

          // 为大图添加水印
          yield new Promise((resolve, reject) => {
            gm(file.buffer)
              .composite('./logo.png')
              .gravity('SouthEast')
              .dissolve(50)
              .geometry(640, 640)
              .write('./upload/' + url, err => {
                if(err){
                  return reject(err);
                }
                resolve();
              });
          });
        }
      })
        .then(() => {
          res.send({
            result: fileList,
            error: null
          });
        }, (res) => {
          console.log(res);
        });
    });
  });

module.exports = router;

