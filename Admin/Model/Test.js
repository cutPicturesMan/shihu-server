let mongoose = require('mongoose');
let TestSchema = require('../Schema/Test');
let Test = mongoose.model('Test', TestSchema);

Test.schema.path('color').validate(function(value){
  console.log(this);
  return /blue|green|red/i.test(value);
}, '颜色不合规格');

module.exports = Test;