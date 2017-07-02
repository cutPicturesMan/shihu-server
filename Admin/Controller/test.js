let mongoose = require('mongoose');
let assert = require('assert');
let Schema = mongoose.Schema;
let formidable = require('formidable');

let express = require('express');
let router = express.Router();

router.route('/')
  .post((req, res) => {
    console.log(req.url);
    var form = new formidable.IncomingForm();
    form.uploadDir = './Admin/Public/images';
    form.keepExtensions = true;
    // form.maxFieldsSize = 0.5 * 1024 * 1024;
    form.multiples = true;
    form.on('progress', function(bytesReceived, bytesExpected) {
      console.log('bytesReceived:' + bytesReceived);
      console.log('bytesExpected:' + bytesExpected);
    });

    let files = [];

    form
      .on('field', (name, value) => {
        console.log('------');
        console.log(value);
      })
      .on('fileBegin', (name, file) => {
        console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
        files.push(file);
        console.log(file);
      })
      .on('file', (name, file) => {
        console.log('------');
        files.push(file);
        console.log(file);
      })
      .on('end', () => {
        console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');

        res.send({
          result: files
        });
      })
      .on('error', (err) => {
        console.log('xxxxxxxxxxxxx');
        console.log(err);
        // res.send({
        //   result: null,
        //   error: err
        // })
      });

    form.parse(req);
  });

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

