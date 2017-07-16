# 店铺Api

## Api说明
| 参数名         | 类型           | 是否必要    | 默认值  | 说明    |
| ------------- |:------------- | :--------: | :----: | :----- |
| _id           | ObjectId      | 系统自动创建 | 无     | 店铺id  |
| name          | String        | 是         | 无     | 店铺名称 |
| addressText   | String        | 是         | 无     | 店铺地址 |
| latitude      | Number        | 是         | 无     | 店铺经度 |
| longitude     | Number        | 是         | 无     | 店铺纬度 |
| phone         | String        | 是         | 无     | 店铺联系方式，多个用逗号分开 |
| servingTime   | Array         | 是         | [{begin:"00:00", end:"23:00"}]     | 营业时间，多个对象代表不同营业时段，不支持跨天 |
| isPremium     | Boolean       | 否         | true   | 是否品牌馆店铺 |
| isOnTime      | Boolean       | 否         | true   | 是否支持准时达 |
| isOpen        | Number        | 否         | 1      | 店铺整体营业状态，0店铺关闭，1店铺营业中 |
| agentFee      | Number        | 否         | 0      | 配送费 |
| deliverAmount | Number        | 否         | 20     | 起送价 |
| photoList     | Array         | 否         | []     | 店铺图片列表 |
| logoUrl       | String        | 否         | Public/images/logo.png     | 店铺Logo地址 |
| description   | String        | 否         | ""     | 店铺描述 |

## 1、查询店铺
查询店铺详情时，需额外关联订单表查询最近一个月的美食销量`recentFoodPopularity`和订单量`recentOrderNum`

### URL
* url中既无查询字符串也无_id，则默认分页查询，一页查询10条数据
* url中只有查询字符串，则按关键字分页查询店铺列表
* url中只有_id，则查询指定店铺
```
[get] /shop/
[get] /shop/?page=1&limit=5
[get] /shop/:_id
```

### URL参数

| 参数名         | 类型           | 是否必要  | 说明 |
| ------------- |:------------- | :----- | :----- |
| _id           | String | 否 | 第几页，默认为1 |
| page          | Number | 否 | 第几页，默认为1 |
| limit         | Number | 否 | 一页显示多少条，默认为10 |

```json
{
    "result": {
        "__v": 0,
        "updatedAt": "2017-07-13T09:11:14.643Z",
        "createdAt": "2017-07-13T09:11:14.643Z",
        "name": "麦当劳",
        "addressText": "厦门市观日路8号",
        "latitude": 123456789,
        "longitude": 123456789,
        "phone": "15960210046,13950381053",
        "_id": "596739324c9b5513d03d8edf",
        "isOnTime": true,
        "isPremium": true,
        "isOpen": 1,
        "agentFee": 5,
        "deliverAmount": 20,
        "photoList": [
            {
                "thumbUrl": "缩略图地址_1",
                "imgUrl": "大图地址_1"
            },
            {
                "thumbUrl": "缩略图地址_2",
                "imgUrl": "大图地址_2"
            }
        ],
        "logoUrl": "logo地址",
        "description": "美味可口，就在麦当劳",
        "servingTime": [
            {
                "begin": "08:00",
                "end": "12:00"
            }
        ]
    },
    "error": null
}
```

## 2、新增店铺
### URL
```
[post][json] /shop/
```

### POST参数
参考顶部[Api说明](#Api说明)的必要字段

### 返回值
#### 成功
``` json
{
    "result": {
        "__v": 0,
        "updatedAt": "2017-07-13T12:43:50.294Z",
        "createdAt": "2017-07-13T12:43:50.294Z",
        "name": "麦当劳",
        "addressText": "厦门市观日路8号",
        "latitude": 123456789,
        "longitude": 123456789,
        "phone": "15960210046,13950381053",
        "_id": "59676b066863901db0613e21",
        "agentFee": 5,
        "deliverAmount": 20,
        "isOnTime": true,
        "isPremium": true,
        "isOpen": 1,
        "photoList": [
            {
                "thumbUrl": "缩略图地址_1",
                "imgUrl": "大图地址_1"
            },
            {
                "thumbUrl": "缩略图地址_2",
                "imgUrl": "大图地址_2"
            }
        ],
        "logoUrl": "",
        "description": "美味可口，就在麦当劳",
        "servingTime": [
            {
                "begin": "08:00",
                "end": "12:00"
            }
        ]
    },
    "error": null
}
```

#### 失败
```json
{
    "result": null,
    "error": {
        "message": "餐厅名称重复"
    }
}
```

## 3、修改商家信息
### URL
```
[put][json] /shop/:_id
```

### URL参数
| 参数名         | 类型           | 是否必要  | 说明 |
| ------------- |:------------- | :----- | :----- |
| _id           | String | 是 | 商家id |

### 返回值
#### 成功


#### 失败


## 4、删除商家(超级管理员才有权限)
### URL
```
[delete] /shop/:_id
```

### URL参数
| 参数名         | 类型           | 是否必要  | 说明 |
| ------------- |:------------- | :----- | :----- |
| _id          | String | 是 | 商家id |

### 返回值
#### 成功
``` json
{
    "result": {
        "n": 1,
        "ok": 1
    },
    "error": null
}
```

#### 失败

权限不足：
``` json
{
    "result": null,
    "error": {
        "message": "对不起，只有超级管理员才有权限删除"
    }
}
```

id格式不正确：
``` json
{
    "result": null,
    "error": {
        "message": "Cast to ObjectId failed for value \"1\" at path \"_id\" for model \"Shop\"",
        "name": "CastError",
        "stringValue": "\"1\"",
        "kind": "ObjectId",
        "value": "1",
        "path": "_id"
    }
}
```