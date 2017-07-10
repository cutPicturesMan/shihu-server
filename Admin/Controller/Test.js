let express = require('express');
let url = require('url');
let session = require('express-session');
let router = express.Router();

router.route('/')
  .get((req, res) => {
    // console.log(query);
    // console.log(url.format(req.query));
    res.redirect('login/login_in' + req.url.slice(1, -1));
    // console.log('您的session为：');
    // console.log(req.session);
    // res.send(req.session);
  });

module.exports = router;



