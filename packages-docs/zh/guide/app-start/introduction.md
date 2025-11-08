# 应用启动自定义

对于常规业务需求，一般只需创建[启动项](../distributed/startup/introduction.md)即可

对于特殊的底层需求，可以使用 VonaJS 提供的`Hook/Monkey`机制

在解释`Hook/Monkey`机制之前，有必要先了解应用启动/停止的时序

## 应用启动时序

![](../../assets/img/app-start/app-start.png)

应用启动时序分四个步骤：

1. `appLoad`: 加载所有的模块。针对每个模块均触发钩子`moduleLoading`、`configLoaded`、`moduleLoaded`
2. `appStart`: 触发钩子`appStart`。比如，模块`a-startup`响应此钩子，执行`应用启动项`(after: false)
   - 当`appStart`执行后，会设置`app.meta.appReady=true`。此时，系统提供的所有 API 服务可以接受客户端的请求
3. `appReady`: 触发钩子`appReady`。比如，模块`a-startup`响应此钩子，执行`应用启动项`(after: true)
4. `appStarted`: 触发钩子`appStarted`

## 应用停止时序

![](../../assets/img/app-start/app-close.png)

应用停止时序分两个步骤：

1. `appClose`: 触发钩子`appClose`
4. `appClosed`: 触发钩子`appClosed`

## 钩子清单

系统提供了三个场景来响应应用启动/停止的钩子:

1. `Module Main`: 在模块代码中响应模块自身的钩子
2. `Module Monkey`: 在模块代码中响应系统钩子
3. `App Monkey`: 在应用代码中响应系统钩子

针对不同的场景，为不同的钩子提供了对应的接口定义，从而规范钩子的使用

|钩子|Module Main 接口|Module Monkey 接口|App Monkey 接口|
|--|--|--|--|
|moduleLoading|IModuleMain|IMonkeyModule|IMonkeyModule|
|configLoaded|IModuleMain|IMonkeyModule|IMonkeyModule|
|moduleLoaded|IModuleMain|IMonkeyModule|IMonkeyModule|
|appStart||IMonkeyAppStart|IMonkeyAppStart|
|appReady||IMonkeyAppReady|IMonkeyAppReady|
|appStarted||IMonkeyAppStarted|IMonkeyAppStarted|
|appClose||IMonkeyAppClose|IMonkeyAppClose|
|appClosed||IMonkeyAppClosed|IMonkeyAppClosed|
