let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let utils = require('../Public/javascripts/utils.js');

let express = require('express');
let router = express.Router();

let multer = require('multer');
let md5 = require('md5');
let storage = multer.diskStorage({
  // 存放目录
  destination: 'Admin/Public/images',
  // 文件名：当天时间_文件名_md5(文件信息).后缀
  filename: function (req, file, cb) {
    // 今天日期
    let date = utils.formatDateToYMD(undefined, '_');
    // 分割之后的文件名数组
    let originalnameArr = file.originalname.split('.');
    // 文件名，'fruit.apple.jpg' -> 'fruit.apple'
    let name = file.originalname.slice(0, file.originalname.lastIndexOf('.'));
    // 文件的扩展名，'.jpg'
    let extension = originalnameArr[originalnameArr.length - 1];
    let result = `${date}_${name}_${md5(file)}.${extension}`;
    cb(null, result);
  }
});

// 上传文件的配置
let uploadConfig = {
  // 存放目录
  // dest: 'Admin/Public/images',
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
    let result = ~filter.indexOf(file.mimetype.split('/')[1]);

    // 如果图片类型在允许的列表中，则接收
    if(result){
      cb(null, true);
    }else{
      cb(null, false);
    }
  }
};

let upload = multer(uploadConfig).array('imgs', 12);

router.route('/')
  .post((req, res) => {
    upload(req, res, (err) => {
      if (err) {
        err.message = '';
        if(err.code === 'LIMIT_FILE_COUNT'){
          err.message = '图片上传数量超过8张';
        }
        console.log(JSON.stringify(err));
        return res.send({
          result: 'bbb',
          erros: err
        });
      }

      res.send({
        result: '成功',
        erros: null
      });
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

