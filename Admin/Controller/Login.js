let express = require('express');
let session = require('express-session');
let app = express();

var eleme = require('eleme-openapi-sdk');

var config = new eleme.Config({
  key: 'qDUZ49CseE',
  secret: 'c44420d42eda52d138be3de35ddfea83f00df40b',
  sandbox: true
});
var callback_url = 'http://localhost:3000/test';
var oAuthClient = new eleme.OAuthClient(config);

// 登录
app.get('/login_in', (req, res) => {
  // 如果有返回授权码，则使用授权码换取访问令牌
  console.log(req.query.code);
  if (req.query.code) {
    console.log(1);
    console.log(req.query.code);
    oAuthClient
      .getTokenByCode(req.query.code, callback_url)
      .then(result => {
        var token = result.access_token;
        req.session.token = token;
        req.session.ccc = 'ccc';
        console.log('返回的token是：');
        console.log(token);
        // 实例化rpcClient对象
        var rpcClient = new eleme.RpcClient(token, config);
        // 实例化一个服务对象
        var userService = new eleme.UserService(rpcClient);

        userService
          .getUser()
          .then(result => {
            var userId = result.userId;
            req.session.auth = result;
            console.log('返回的权限是：');
            console.log(result);
            res.send(result);
          })
          .catch(error => {
            console.log('error2');
            console.warn(error);
          });
      })
      .catch(error => {
        console.log('error1');
        console.warn(error);
      });
  } else {
    var authUrl = oAuthClient.getOAuthUrl(callback_url, '123', 'all');
    res.redirect(authUrl);
  }
});

app.get('/set_session', (req, res) => {
  req.session.aaa = 'zz';
  res.send(req.session);
});

app.get('/session', (req, res) => {
  console.log('您的session为：');
  console.log(req.session);
  res.send(req.session);
  // console.log(req.session);
  // console.log(JSON.stringify(req.session));
  // let sess = req.session;
  //
  // if(sess.view){
  //   sess.view++;
  // }else{
  //   sess.view = 1;
  // }
  // console.log(sess);
});

// 登出
app.post('login_out', (req, res) => {

});

module.exports = app;





