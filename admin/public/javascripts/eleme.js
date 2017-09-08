/**
 * Created by wksadmin on 2017/7/11.
 */
var eleme = require('eleme-openapi-sdk');

var config = new eleme.Config({
  key: 'qDUZ49CseE',
  secret: 'c44420d42eda52d138be3de35ddfea83f00df40b',
  sandbox: true
});
var callback_url = 'http://localhost:3000/test';
var oAuthClient = new eleme.OAuthClient(config);

module.exports = {
  eleme: eleme,
  config: config,
  callback_url: callback_url,
  oAuthClient: oAuthClient
}