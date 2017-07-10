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
    console.log(req.session);
    // 如果有返回授权码，则使用授权码换取访问令牌
    if(req.query.code){
      console.log(1);
      oAuthClient
        .getTokenByCode(req.query.code, callback_url)
        .then(result => {
          var token = result.access_token;
          req.session.token = token;
          // 实例化rpcClient对象
          var rpcClient = new eleme.RpcClient(token, config);
          // 实例化一个服务对象
          var userService = new eleme.UserService(rpcClient);

          userService
            .getUser()
            .then(result => {
              var userId = result.userId;
              req.session.userId = userId;
              // console.log('-----');
              // console.log(result);
              // console.log(result.authorizedShops[0].id);

              // 建立userId与token，自行实现
              // saveToken(userId, token)


              // var shopService = new eleme.ShopService(rpcClient);
              // shopService.updateShop(156715843, {
                // "addressText": "上海市长宁区龙溪路虹桥路1923号",
                // "geo": "111.223,22.233",
                // "agentFee": 3,
                // "closeDescription": "业务繁忙",
                // "deliverDescription": "超过5公里，100元起送",
                // "deliverGeoJson": "{\"type\":\"FeatureCollection\",\"features\":[{\"geometry\":{\"type\":\"Polygon\",\"coordinates\":[[[121.381303,31.243521],[121.380938,31.242778],[121.381679,31.243297],[121.381303,31.243521]]]},\"type\":\"Feature\",\"properties\":{\"area_agent_fee\":20,\"delivery_price\":10,\"manual_weight\":0,\"system_weight\":0,\"weight_type\":1}}]}",
                // "description": "便宜好吃的小食",
                // "name": "烤鸭大王",
                // "isBookable": 1,
                // "openTime": "10:00-13:00,18:00-21:00",
                // "phone": "18516307705,13482893679",
                // "promotionInfo": "本周全场半价",
                // "logoImageHash": "3077080f760e7bf0fc985e23dd3e36e2",
                // "invoice": 1,
                // "invoiceMinAmount": 100,
                // "noAgentFeeTotal": 20,
                // "isOpen": 1,
                // "packingFee": 2,
                // "openId": "2132123213123"
              // })
              //   .then(result => {
              //     console.log(result)
              //   })
              //   .catch(error => {
              //     console.warn(error)
              //   })
              // shopService.getShop(result.authorizedShops[0].id)
              //   .then(result => {
              //     console.log(result)
              //   })
              //   .catch(error => {
              //     console.warn(error)
              //   })

              var productService = new eleme.ProductService(rpcClient);

              // productService.createCategory(result.authorizedShops[0].id, "甜品", "香甜可口哟~")
              //   .then(result => {
              //     res.send({
              //       code: 200,
              //       result: result
              //     });
              //   })
              //   .catch(error => {
              //     console.warn(error)
              //   })

              productService.getShopCategories(result.authorizedShops[0].id)
                .then(result => {
                  console.log(result[1].id);
                  productService.createItem(526391258, {
                    "name": "白切鸡3",
                    "description": "香脆可口，外焦里嫩",
                    "specs": [
                      {
                        "specId": 72970000222,
                        "name": "大份",
                        "price": 18,
                        "stock": 9000,
                        "maxStock": 10000,
                        "packingFee": 1,
                        "onShelf": 1,
                        "extendCode": "1234567893",
                        "barCode": "X148948686356666",
                        "weight": 123,
                        "activityLevel": 1
                      }
                    ]
                  })
                    .then(result => {
                      console.log(result)
                      res.send(result);
                    })
                    .catch(error => {
                      console.warn(error)
                    })
                  console.log(result)
                })
                .catch(error => {
                  console.warn(error)
                })
            })
            .catch(error => {
              console.warn(error)
            })
        })
        .catch(error => {
          console.warn('eeeeeeeeeeeeeeeeeeeeeeee')
          console.warn(error)
        });
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
    console.log(req.session);
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



