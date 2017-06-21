### 错误码说明
在返回的json里，错误码说明如下：

* 如果最外层code = 200，且data中没有error_code，那么是正常返回
* 如果最外层code != 200，且data中没有error_code，那么异常返回，且错误消息取code对应的文字
* 如果最外层code != 200，且data中有error_code，那么异常返回，且错误消息取error_code对应的文字

#### 错误码列表



