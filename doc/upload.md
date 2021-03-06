# 上传图片
上传图片用的是express的[multer](https://github.com/expressjs/multer)中间件，multer有两种存储方式，一种是将上传文件直接写入硬盘，另一种是将文件读取到内存中，具体写入操作要手动处理。由于需要使用[GM](https://github.com/aheckmann/gm)对上传的文件进行修改尺寸、加水印、生成缩略图等操作，因此选择第二种方式读取上传文件，不需要反复进行I/O操作。在服务器端对文件做了相应的判断以及操作，符合条件的文件写入到`./upload/(对应日期)`文件夹中，最后返回源文件的地址和缩略图的地址

Note: 使用GM前需要确保电脑上安装了GraphicsMagick[下载](http://www.graphicsmagick.org/download.html#ftp-site-organization)或者ImageMagick[下载](http://www.imagemagick.org/script/download.php)，具体安装方法看相应的官网。这里说一点，在win7 64位系统下，我起初安装的是`ImageMagick-7.0.6-0-Q16-x64-dll.exe`，使用GM时一直提示`gm/convert binaries can't be found`，应该是7.0.6的版本跟win7有冲突，导致ImageMagick无法将图片文件转为二进制的文件，后来使用`ImageMagick-6.9.3-5-Q16-x64-static.exe`，就不会报错了。不过由于6.9.3的版本久远，ImageMagick官网没有提供下载，就转而用GraphicsMagick了。我下载的是`GraphicsMagick-1.3.26-Q16-win64-dll.exe`，在win7上测试可用。

上传图片时请设置请求头`Content-Type: multipart/form-data`

* 允许的图片类型：jpg|jpeg|png
* 每次上传的最大数量：8张
* 单张图片大小限制：5M
* 推荐图片分辨率：640x640
* 自动生成的缩略图大小：140x140

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
        url: '',                 // 源文件路径
        thumb_url: ''            // 缩略图路径
    }, {
        url: '',
        thumb_url: ''
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