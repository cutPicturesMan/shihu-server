let express = require('express');
let session = require('express-session');
let {
  eleme,
  config,
  callback_url,
  oAuthClient
} = require('../public/javascripts/eleme');
let app = express();

// 登录
app.get('/login_in', (req, res) => {
  // 如果token存在，则直接访问首页
  if(req.session.token){
    return res.redirect('/');
  }
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
        console.log('返回的token是：');
        console.log(token);
        // 实例化rpcClient对象
        var rpcClient = new eleme.RpcClient(token, config);

        // 实例化一个服务对象
        var userService = new eleme.UserService(rpcClient);
        userService
          .getUser()
          .then(result => {
            Object.assign(req.session, result);
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
  console.log('您的session为');
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





