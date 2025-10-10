# 内置中间件

## 全局中间件

|名称|说明|
|--|--|
|a-core:gate|可以让API在指定的运行环境生效|

## 系统中间件

|名称|说明|
|--|--|
|a-core:notfound|404|
|a-core:overrideMethod||
|a-instance:appReady|初始化app对象|
|a-instance:instance|初始化instance对象|
|a-logger:httpLog|输出日志|
|a-security:cors|CORS|
|a-security:securities|Securities|
|a-static:static|处理静态资源|

## a-core:gate

可以让 API 在指定的运行环境生效

|名称|类型|说明|
|--|--|--|
|flavor|string\|string[]|参见: [运行环境与Flavor](../../techniques/mode-flavor/introduction.md)|
|mode|string\|string[]|参见: [运行环境与Flavor](../../techniques/mode-flavor/introduction.md)|
|instanceName|string\|string[]|参见: [多实例/多租户](../../techniques/instance/introduction.md)|
|host|string\|string[]|主机名|

* 举例

``` typescript
@Aspect.middlewareGlobal('a-core:gate', {
  gate: {
    flavor: 'normal',
    mode: 'dev',
    instanceName: '',
    host: 'localhost:7102',
  },
})
```
