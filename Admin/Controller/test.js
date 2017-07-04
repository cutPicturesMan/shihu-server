let express = require('express');
let mongoose = require('mongoose');
let multer = require('multer');
let path = require('path');
let fs = require('fs');
let gm = require('gm').subClass({imageMagick: true});
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

let storage = multer.diskStorage({
  // 存放目录，在./Admin/Upload下，以日期来创建文件夹，如：./Admin/Upload/20170526
  destination: (req, file, cb) => {
    // 今天日期
    let date = utils.formatDateToYMD(undefined, '');
    let path = './Upload/' + date;

    // 如果存在以今天日期命名的文件夹，则直接把图片存到该文件夹
    if (utils.fsExistsSync(path)) {
      cb(null, path);
    } else {
      // 否则新建一个文件夹
      fs.mkdir(path);
    }
  },
  // 文件名：时间戳_文件名.后缀
  filename: function (req, file, cb) {
    // 分割之后的文件名数组
    let originalnameArr = file.originalname.split('.');
    // 文件名，'fruit.apple.jpg' -> 'fruit.apple'
    let name = file.originalname.slice(0, file.originalname.lastIndexOf('.'));
    // 文件的扩展名，'.jpg'
    let extension = originalnameArr[originalnameArr.length - 1];
    let fileName = `${new Date().getTime()}_${name}.${extension}`;
    // 缩略图
    let thumbName = `${new Date().getTime()}_${name}_small.${extension}`;
    // 今天日期
    let date = utils.formatDateToYMD(undefined, '');

    fileList.push({
      imgUrl: `${date}/${fileName}`,
      thumbUrl: `${date}/${thumbName}`
    });

    // fs.readFileSync(path.join(__dirname, fileName));
    // fs.readFileSync('./Upload/' + date + '/' + fileName);

    cb(null, fileName);
  }
});

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
    if (result) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
};

let upload = multer(uploadConfig).array('ImgList', 12);

router.route('/')
  .get((req, res) => {
    // creating an image
    gm(200, 400, "#ddff99f3")
      .drawText(10, 50, "from scratch")
      .write("./11111.jpg", function (err) {
        // ...
        console.log(err);
      });
    // gm('./Upload/20170704/1.jpg')
    //   .size(function (err, size) {
    //     console.log(err);
    //     if (!err)
    //       console.log(size.width);
    //       console.log(size.width > size.height ? 'wider' : 'taller than you');
    //   });
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
      console.log(req.files);
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
      res.send({
        result: fileList,
        error: null
      });
      fileList = [];
    });
  });

// console.log(req.url);
// var form = new formidable.IncomingForm();
// form.uploadDir = './Admin/Public/images';
// form.keepExtensions = true;
// // form.maxFieldsSize = 0.5 * 1024 * 1024;
// form.multiples = true;
// form.on('progress', function(bytesReceived, bytesExpected) {
//   console.log('bytesReceived:' + bytesReceived);
//   console.log('bytesExpected:' + bytesExpected);
// });
//
// let files = [];
//
// form
//   .on('field', (name, value) => {
//     console.log('------');
//     console.log(value);
//   })
//   .on('fileBegin', (name, file) => {
//     console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
//     files.push(file);
//     console.log(file);
//   })
//   .on('file', (name, file) => {
//     console.log('------');
//     files.push(file);
//     console.log(file);
//   })
//   .on('end', () => {
//     console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
//
//     res.send({
//       result: files
//     });
//   })
//   .on('error', (err) => {
//     console.log('xxxxxxxxxxxxx');
//     console.log(err);
//     // res.send({
//     //   result: null,
//     //   error: err
//     // })
//   });
//
// form.parse(req);
// let testSchema = Schema({
//   name: {
//     type: String,
//     required: [true, '请输入名称']
//   }
// });
//
// let Test = mongoose.model('test', testSchema);
//
// router.route('/')
//   .post((req, res) => {
//     console.log('------');
//     console.log(req.body);
//
//     let test = new Test(req.body);
//     console.log('```````');
//
//     test.save((err) => {
//       if(err){
//         return console.log(err);
//       }
//
//       console.log('*********');
//       console.log('test');
//       res.send({
//         msg: '新增成功'
//       });
//     });
//   });

// let breakfastSchema = Schema({
//   eggs: {
//     type: Number,
//     min: [6, 'Too few eggs'],
//     max: 12
//   },
//   bacon: {
//     type: Number,
//     required: [true, 'Why no bacon?']
//   },
//   drink: {
//     type: String,
//     enum: ['Coffee', 'Tea'],
//     required: function() {
//       return this.bacon > 3;
//     }
//   }
// });
//
// var Breakfast = mongoose.model('Breakfast', breakfastSchema);
//
// router.route('/')
//   .post((req, res) => {
//     console.log('------');
//     console.log(req.body);
//
//     var badBreakfast = new Breakfast({
//       eggs: 2,
//       bacon: 0,
//       drink: 'Milk'
//     });
//
//     var error = badBreakfast.validateSync();
//
//     console.log(assert.equal(error.errors['eggs'].message,
//       'Too few eggs'));
//
//     console.log(assert.ok(!error.errors['bacon']));
//
//     console.log(assert.equal(error.errors['drink'].message,
//       '`Milk` is not a valid enum value for path `drink`.'));
//
//     console.log('```````');
//     res.send({
//       msg: '新增成功'
//     });
//     // test.save((err) => {
//     //   if(err){
//     //     return console.log(err);
//     //   }
//     //
//     //   console.log('*********');
//     //   console.log('test');
//     //   res.send({
//     //     msg: '新增成功'
//     //   });
//     // });
//   });

module.exports = router;

