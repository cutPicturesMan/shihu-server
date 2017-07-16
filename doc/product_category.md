# 店铺商品分类Api

## Api说明
| 参数名         | 类型           | 是否必要    | 默认值   | 描述       |
| ------------- |:------------- | :--------: | :----: | :--------- |
| _id           | ObjectId      | 系统自动创建 | 无      | 商品分类id |
| name          | String        | 是         | 无      | 商品分类名，不可重复  |
| shop_id       | ObjectId      | 是         | 无      | 该商品分类所属的店铺 |
| is_valid      | Number        | 否         | 1       | 该商品分类是否需要显示出来，0为不显示，其余为显示 |
| weight        | Number        | 否         | 1       | 商品分类权重，数值越大，在菜单中的排序就越靠前 |

## 1、查询店铺商品分类列表
### URL
* url中既无查询字符串也无商品分类_id，则默认分页查询，一页查询10条数据
* url中只有查询字符串，则按关键字分页查询店铺列表
* url中只有商品分类_id，则查询指定商品分类
```
[get] /product_category/
[get] /product_category/?name=水果
&shop_id=59677003124ce91e50610b6d
&date_from='2017-05-20'
&date_to='2017-05-22'
&sort=weight
&order=1
&page=1
&limit=5

[get] /product_category/:_id
```

### URL参数
| 参数名         | 类型      | 是否必要  | 说明              |
| ------------- |:-------- | :-----   | :--------------- |
| _id           | String   | 否       | 商品分类的id        |

### 查询字符串参数
| 参数名         | 类型      | 是否必要  | 说明              |
| ------------- |:-------- | :-----   | :--------------- |
| name          | String   | 否       | 模糊查询商品分类名称 |
| shop_id       | ObjectId | 否       | 店铺Id，查询指定店铺的商品分类 |
| date_from     | String   | 否       | 查询起始日期 |
| date_to       | String   | 否       | 查询结束日期 |
| sort          | String   | 否       | 排序字段 |
| order         | String   | 否       | 排序顺序，asc正序，desc倒叙，默认为desc |
| page          | Number   | 否       | 第几页，默认为1 |
| limit         | Number   | 否       | 一页显示多少条，默认为10 |


### 返回示例
```json
{
    "result": [
        {
            "_id": "596b238dfbe6b004d0ae0700",
            "updatedAt": "2017-07-16T08:58:44.703Z",
            "createdAt": "2017-07-15T08:27:57.642Z",
            "name": "主食",
            "shop_id": "59677003124ce91e50610b6d",
            "__v": 0,
            "weight": 20,
            "is_valid": 1
        },
        {
            "_id": "596b2373fbe6b004d0ae06ff",
            "updatedAt": "2017-07-16T08:27:31.806Z",
            "createdAt": "2017-07-16T08:27:31.806Z",
            "name": "小炒",
            "shop_id": "59677003124ce91e50610b6d",
            "__v": 0,
            "weight": 15,
            "is_valid": 1
        }
    ],
    "error": null
}
```

## 2、新增
### URL
```
[post][json] /product_category/
```

### POST参数
参考顶部[Api说明](#Api说明)的具体字段

### 返回值
#### 成功
``` json
{
    "result": {
        "__v": 0,
        "updatedAt": "2017-07-16T09:08:35.267Z",
        "createdAt": "2017-07-16T09:08:35.267Z",
        "name": "经典奶茶系列",
        "shop_id": "59677003124ce91e50610b61",
        "_id": "596b2d1366e16c099829f71f",
        "weight": 1,
        "is_valid": 1
    },
    "error": null
}
```

#### 失败
``` json
{
    "result": null,
    "error": {
        "message": "商品分类名称重复"
    }
}
```

## 3、修改
### URL
```
[put][json] /product_category/:_id
```

### put参数
参考顶部[Api说明](#Api说明)的具体字段

### 返回值
#### 成功
``` json
{
    "ok": 1,
    "nModified": 1,
    "n": 1
}
```

#### 失败
``` json
{
    "result": null,
    "error": {
        "message": "商品分类名称重复"
    }
}
```



## 4、删除
### URL
```
[delete] /store/:id
```

### URL参数
| 参数名         | 类型           | 是否必要  | 说明 |
| ------------- |:------------- | :----- | :----- |
