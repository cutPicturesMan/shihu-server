let express = require('express');
let session = require('express-session');
let router = express.Router();

var eleme = require("eleme-openapi-sdk");

var config = new eleme.Config({
  key: "qDUZ49CseE",
  secret: "c44420d42eda52d138be3de35ddfea83f00df40b",
  sandbox: true
});
var callback_url = 'http://localhost:3000/test';
var oAuthClient = new eleme.OAuthClient(config);

router.route('/')
  .get((req, res) => {
    // 如果有返回授权码，则使用授权码换取访问令牌
    if(req.query.code){
      console.log(1);
      oAuthClient
        .getTokenByCode(req.query.code, callback_url)
        .then(result => {
          console.log('zzzzz');
          console.log('result');
          var token = result.access_token;
          // 实例化rpcClient对象
          var rpcClient = new eleme.RpcClient(token, config);
          // 实例化一个服务对象
          var userService = new eleme.UserService(rpcClient);
          userService
            .getUser()
            .then(result => {
              var userId = result.userId;
              console.log('-----');
              console.log(result);
              // 建立userId与token，自行实现
              // saveToken(userId, token)
            })
        })

      res.send('成功');
    }else{
      console.log(2);
      var authUrl = oAuthClient.getOAuthUrl(callback_url, '123', 'all');
      res.redirect(authUrl);
    }

    //   let redirect_uri = 'http://localhost:3000';
    //   let redirect_url = `https://open-api-sandbox.shop.ele.me/authorize?response_type=code&client_id=qDUZ49CseE&scope=scope&state=123&redirect_uri=${redirect_uri}`;
    //   res.redirect(redirect_url);
    //
    // var config = new eleme.Config({
    //   key: "qDUZ49CseE",
    //   secret: "c44420d42eda52d138be3de35ddfea83f00df40b",
    //   sandbox: true
    // });
    // var oAuthClient = new eleme.OAuthClient(config);
    // var authUrl = oAuthClient.getOAuthUrl('http://www.baidu.com', '01baf738-a042-49c6-82cd-bdd3455a02a5', 'all');
    // console.log(oAuthClient);
    // console.log(authUrl);
    // var rpcClient = new eleme.RpcClient("yourtoken", config);
    // var productService = new eleme.ProductService(rpcClient);
    // productService.createCategory(987777, "蛋炒饭", "一道美味的炒饭")
    //   .then(result => {
    //     console.log(result)
    //   })
    //   .catch(error => {
    //     console.warn(error)
    //   })
  });

router.route('/session')
  .get((req, res) => {
    console.log(req.body);
    console.log(JSON.stringify(req.session));
    let sess = req.session;

    if(sess.view){
      sess.view++;
    }else{
      sess.view = 1;
    }
    console.log(sess);

    // session({
    //   secret: 'keyboard cat',
    //   resave: false,
    //   saveUninitialized: true,
    //   cookie: { secure: true }
    // })

    res.send(req.body);
  })

module.exports = router;



