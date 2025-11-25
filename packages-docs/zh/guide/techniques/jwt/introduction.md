# JWT

VonaJS 基于[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)提供了强大而灵活的 JWT 

## App Config配置

可以在 App Config 中进行 JWT 配置：

`src/backend/config/config/config.ts`

``` typescript
// modules
config.modules = {
  'a-jwt': {
    tempToken: {
      signOptions: { expiresIn: 5 * 60 },
    },
    base: {
      secret: undefined,
      signOptions: { issuer: env.APP_NAME },
    },
    clients: {
      access: {
        signOptions: { expiresIn: 2 * 60 * 60 },
      },
      refresh: {
        signOptions: { expiresIn: 7 * 24 * 60 * 60 },
      },
    },
  },
};
```

|名称|说明|
|--|--|
|tempToken|临时accessToken的配置|
|base|基础配置，为所有Clients提供通用的基础配置|
|clients|配置多个Clients。系统提供了内置的`access/refresh` Clients，用于生成`accessToken/refreshToken`|

- `signOptions`: 参见: [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

## 添加新Client

下面通过添加新 Client 解释 Client 的配置

### 1. 添加类型定义

采用接口合并机制添加新 Client 的类型定义，比如`test`，为测试场景生成 JWT token

在 VSCode 编辑器中，输入代码片段`recordloggerclient`，自动生成代码骨架:

``` typescript
declare module 'vona' {
  export interface ILoggerClientRecord {
    : never;
  }
}
```

调整代码，然后添加`order`

``` diff
declare module 'vona' {
  export interface ILoggerClientRecord {
+   order: never;
  }
}
```

### 2. 增加Client配置

`src/backend/config/config/config.ts`

``` typescript
// logger
config.logger = {
  clients: {
    order(this: VonaApplication, clientInfo) {
      const transports = [
        this.bean.logger.makeTransportFile(clientInfo, 'order'),
        this.bean.logger.makeTransportConsole(clientInfo),
      ];
      return { transports };
    },
  },
};
```

- `order`: 通过函数返回 Client 配置。该配置将与系统提供的默认配置进行合并
  - 因此，在一般情况下，只需构造所需的`transports`即可
- `clientInfo`: 包含环境信息，用于构造`transport`
- `makeTransportFile`: 用于构造文件通道，需要提供日志文件名`order`
  - 由于文件名模版是`${filename}-%DATE%.log`，那么实际生成的文件名是`order-2025-11-14.log`
- `makeTransportConsole`: 用于构造控制台通道

## 获取Logger Client实例

获取 Logger Client 实例有两种方式:

* `方式1`

``` typescript
class ControllerStudent extends BeanBase {
  async test() {
    // logger: default
    const loggerDefault = this.bean.logger.default;
    // logger: order
    const loggerOrder = this.bean.logger.get('order');
  }
}
```

* `方式2`

``` typescript
class ControllerStudent extends BeanBase {
  async test() {
    // logger: default
    const loggerDefault = this.$logger;
    // logger: order
    const loggerOrder = this.$loggerClient('order');
  }
}
```

`方式2`不仅代码更加简洁，而且还会自动在日志中带上当前 Bean Class 的`beanFullName`，便于排查问题

* 举例：

``` typescript
const loggerOrder = this.bean.logger.get('order');
loggerOrder.info('test');
```

![](../../../assets/img/logger/logger-1.png)

``` typescript
// logger: default
this.$logger.info('test');
// logger: order
this.$loggerClient('order').info('test');
```

![](../../../assets/img/logger/logger-2.png)

图中输出了 beanFullName: `[demo-student.controller.student]`


