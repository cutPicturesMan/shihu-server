# 商品Api

## 2、新增商品
### URL
```
[POST] [json] /product/create
```

### 返回值
#### 成功
```json
{
    "result": {
        "__v": 0,
        "updatedAt": "2017-07-12T01:34:36.402Z",
        "createdAt": "2017-07-12T01:34:36.402Z",
        "name": "鸡腿",
        "description": "美味可口",
        "imageUrl": "img",
        "_id": "59657cac6e53611c0c1f649c",
        "sku": [
            {
                "name": "大份",
                "price": 18,
                "_id": "59657cac6e53611c0c1f649e",
                "discount": 95,
                "stock": 3
            },
            {
                "name": "小份",
                "price": 12,
                "_id": "59657cac6e53611c0c1f649d",
                "discount": 85,
                "stock": 5
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
    "error": [
        {
            "code": "ValidatorError",
            "message": "请填写商品名称"
        }
    ]
}
```
