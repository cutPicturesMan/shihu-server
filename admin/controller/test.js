let express = require('express');
let router = express.Router();
let Test = require('../model/test');

router.route('/')
  .get((req, res) => {
    var opts = { runValidators: true };
    Test.update({}, { color: 'bacon' }, opts, function (err) {
      console.log(err);
        res.send(err);
    });
  });

module.exports = router;



