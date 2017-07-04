# 上传图片
上传图片时请设置请求头`Content-Type: multipart/form-data`

* 允许的图片类型：jpg|jpeg|png
* 每次上传的最大数量：8张
* 单张图片大小限制：1M
* 推荐图片分辨率：1280 * 1280
* 自动生成的缩略图大小：480 * 480

### URL
```
[post] /upload
```

## Api说明
| 参数名         | 类型           | 是否必要  | 说明 |
| ------------- |:------------- | :----- | :----- |
| ImgList       | Array         | 是 | 需要上传的图片列表 |


#### 返回
```json
{
    "result": [{
        imgUrl: '',             // 源文件路径
        thumbUrl: ''            // 缩略图路径
    }, {
        imgUrl: '',
        thumbUrl: ''
    }],
    "error": null
}
```

#### 错误处理

```json
{
    "result": null,
    "error": {
        "code": "LIMIT_FILE_SIZE",           // 错误码
        "message": "上传文件大小超过限制"       // 错误提示
    }
}
```

## 错误码列表
| code            | message        |
| :-------------  | :------------- |
| LIMIT_PART_COUNT      | 上传字段和上传文件的总和超出限制 |
| LIMIT_FILE_SIZE       | 上传文件大小超过限制 |
| LIMIT_FILE_COUNT      | 上传文件数量超过限制 |
| LIMIT_UNEXPECTED_FILE | 上传文件的字段名称未填写 |
| LIMIT_FIELD_KEY       | 上传字段名称过长 |
| LIMIT_FIELD_VALUE     | 上传字段值过长 |
| LIMIT_FIELD_COUNT     | 上传字段数量超过限制 |