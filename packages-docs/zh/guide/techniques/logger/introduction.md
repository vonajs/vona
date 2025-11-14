# 日志

VonaJS 基于[winston](https://github.com/winstonjs/winston)提供了强大而灵活的日志系统

## 特性

1. `多Client`: 每个 Client 有独立的配置
2. `多Child`: 可以为不同的场景创建 Child 日志
3. `Rotate`: 按约定的规则对日志进行轮换
4. `日志分级`: 可以基于分级控制写入日志文件的内容

## 日志目录

针对不同的运行环境默认使用不同的日志目录:

- `测试环境/开发环境`: `{project path}/.app/logs`
- `生产环境`: `{home}/vona/{project name}/logs`

可以在 App Config 或者.env 文件中修改配置

### 1. App Config

`src/backend/config/config/config.ts`

``` typescript
// server
config.server = {
  loggerDir: '/new/path',
};
```

### 2. .env

`env/.env`

``` typescript
# server
SERVER_LOGGERDIR = /new/path
```

## App Config配置

可以在 App Config 中进行日志配置：

`src/backend/config/config/config.ts`

``` typescript
// logger
config.logger = {
  rotate: {},
  default: {},
  clients: {},
};
```

|名称|说明|
|--|--|
|rotate|日志Rotate|
|default|缺省配置，为所有Client提供通用的基础配置|
|clients|配置多个Client|

## Rotate

系统提供了默认的轮换配置，并且处于开启状态。可以在 App Config 或者.env 文件中修改配置

### 1. App Config

`src/backend/config/config/config.ts`

``` typescript
// logger
config.logger = {
  rotate: {
    enable: true,
    options(filename: string) {
      return {
        filename: `${filename}-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '7d',
      };
    },
  },
};
```

|名称|说明|
|--|--|
|enable|是否启用Rotate|
|options|通过函数返回Rotate配置|
|options.filename|文件名模版|
|options.datePattern|日期模式|
|options.maxSize|每个文件的最大尺寸|
|options.maxFiles|只保留几天之内的文件|

### 2. .env

`env/.env`

``` typescript
# logger
LOGGER_ROTATE_ENABLE = true
LOGGER_ROTATE_FILENAME = '{{filename}}-%DATE%.log'
LOGGER_ROTATE_DATEPATTERN = YYYY-MM-DD
LOGGER_ROTATE_MAXSIZE = 20m
LOGGER_ROTATE_MAXFILES = 7d
```

## 添加新Client

下面通过添加新 Client 解释 Client 的配置

### 1. 添加类型定义

采用接口合并机制添加新 Client 的类型定义，比如`order`，用于输出独立的与订单相关的日志

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
        this.meta.logger.makeTransportFile(clientInfo, 'order'),
        this.meta.logger.makeTransportConsole(clientInfo),
      ].filter(item => !!item);
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
- `filter`: 新建的通道有可能为空，需要进行 filter

## 获取Logger实例

获取 Logger 实例有两种方式:

* 方式 1

``` typescript
class ControllerStudent extends BeanBase {
  async test() {
    const loggerDefault = this.app.meta.logger.get();
    const loggerOrder = this.app.meta.logger.get('order');
  }
}
```

* 方式 2

``` typescript
class ControllerStudent extends BeanBase {
  async test() {
    const loggerDefault = this.$logger;
    const loggerOrder = this.$loggerClient('order');
  }
}
```

`方式2`不仅代码简洁，而且还会自动在日志中带上当前 Bean Class 的`BeanFullName`，便于排查信息

* 举例：



