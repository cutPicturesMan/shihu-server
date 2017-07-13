# 店铺Api

## Api说明
| 参数名         | 类型           | 是否必要  | 默认值  | 说明    |
| ------------- |:------------- | :------: | :----: | :----- |
| name          | String        | 是       | 无     | 店铺名称 |
| addressText   | String        | 是       | 无     | 店铺地址 |
| latitude      | Number        | 是       | 无     | 店铺经度 |
| longitude     | Number        | 是       | 无     | 店铺纬度 |
| phone         | String        | 是       | 无     | 店铺联系方式，多个用逗号分开 |
| isPremium     | Boolean       | 否       | true   | 是否品牌馆店铺 |
| isOnTime      | Boolean       | 否       | true   | 是否支持准时达 |
| isOpen        | Number        | 否       | 1      | 店铺整体营业状态，0店铺关闭，1店铺营业中 |
| agentFee      | Number        | 否       | 0      | 配送费 |
| deliverAmount | Number        | 否       | 20     | 起送价 |
| photoList     | Array         | 否       | []     | 店铺图片列表 |
| logoUrl       | String        | 否       | Public/images/logo.png     | 店铺Logo地址 |
| description   | String        | 否       | ""     | 店铺描述 |
| servingTime   | Array         | 否       | [{begin:"00:00", end:"23:00"}]     | 营业时间，多个对象代表不同营业时段，不支持跨天 |

## 1、获取店铺列表
### URL
```
[get] /shop/:_id/
```

### URL参数

| 参数名         | 类型           | 是否必要  | 说明 |
| ------------- |:------------- | :----- | :----- |
| page          | Number | 否 | 第几页，默认为1 |
| limit         | Number | 否 | 一页显示多少条，默认为10，最大为50 |

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

## 2、新增商家
### URL
```
[post] /shop/
```

### URL参数
| 参数名         | 类型           | 是否必要  | 说明 |
| ------------- |:------------- | :----- | :----- |
| name          | String | 是 | 商家名称 |
| page          | Number | 否 | 第几页，默认为1 |
| limit         | Number | 否 | 一页显示多少条，默认为10，最大为50 |


### 异常示例


### 返回值
成功

``` json
{
    "result": {
        "n": 0,
        "ok": 1
    },
    "error": null
}
```

## 3、修改商家信息
### URL
```
[put] /shop/:_id
```

### URL参数
| 参数名         | 类型           | 是否必要  | 说明 |
| ------------- |:------------- | :----- | :----- |
| _id          | String | 是 | 商家id |

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