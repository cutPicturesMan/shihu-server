### 1、获取商家列表
#### URL
```
[get] /admin/store/
```

#### URL参数

| 参数名         | 类型           | 是否必要  | 说明 |
| ------------- |:------------- | :----- | :----- |
| category      | Number | 否 | 查询该分类下的商家列表，不传则获取全部 |
| page          | Number | 否 | 第几页，默认为1 |
| limit         | Number | 否 | 一页显示多少条，默认为10，最大为50 |

#### 2、新增商家
#### URL
```
[post] /admin/store/
```

#### URL参数
| 参数名         | 类型           | 是否必要  | 说明 |
| ------------- |:------------- | :----- | :----- |
| name          | String | 是 | 商家名称 |
| page          | Number | 否 | 第几页，默认为1 |
| limit         | Number | 否 | 一页显示多少条，默认为10，最大为50 |


#### 错误说明
创建订单的时候如果发生错误，code会返回1022错误（MAKE_ORDER_ERROR），具体定义参考[错误码列表](error.md#错误码列表)
具体的错误原因，会在data里返回字段error_code，表示订单创建的错误，具体的error_code定义参考[下单错误码](error.md#下单错误码)

#### 返回值
成功

``` json
{
    "code": 200,
    message: "ok"
}
```


``` json
{
    "code": 200,
    message: "ok"
}
```

### 3、检查商家名称是否重复
#### URL
```
[post] /admin/store/check_name
```

#### URL参数
| 参数名         | 类型           | 是否必要  | 说明 |
| ------------- |:------------- | :----- | :----- |
| name          | String | 是 | 商家名称 |

#### 返回值
``` json
{
    "result":
}
```

### 4、修改商家信息
#### URL
```
[put] /admin/store/
```

#### URL参数
| 参数名         | 类型           | 是否必要  | 说明 |
| ------------- |:------------- | :----- | :----- |
| name          | String | 是 | 商家名称 |


[post]/admin/store_category/check_name  检查商家分类名称是否重复
[put]/admin/store_category/:id  修改商家分类