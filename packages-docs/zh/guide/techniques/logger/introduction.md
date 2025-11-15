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
  base: {},
  clients: {},
};
```

|名称|说明|
|--|--|
|rotate|日志Rotate|
|base|基础配置，为所有Client提供通用的基础配置|
|clients|配置多个Client。系统提供了内置的`default` Client，实现开箱即用的日志能力|

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

## 获取Logger Client实例

获取 Logger 实例有两种方式:

* `方式1`

``` typescript
class ControllerStudent extends BeanBase {
  async test() {
    // logger: default
    const loggerDefault = this.app.meta.logger.get();
    // logger: order
    const loggerOrder = this.app.meta.logger.get('order');
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
const loggerOrder = this.app.meta.logger.get('order');
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

## 获取Logger Child实例

对于同一个 Logger Client，可以生成多个 Child 实例，不同的 Child 对应不同的场景

比如，生成 Child `pay`，从而在日志中可以明确提示`pay`信息

``` typescript
// child of logger: default
this.$loggerChild('pay').info('$50');
// child of logger: order
this.$loggerChild('pay', 'order').info('$50');
```

![](../../../assets/img/logger/logger-3.png)

图中输出了 child name: `[pay]`

### 添加类型定义

同样，需要提供`pay`的类型定义，从而支持类型提示

在 VSCode 编辑器中，输入代码片段`recordloggerchild`，自动生成代码骨架:

``` typescript
declare module 'vona' {
  export interface ILoggerChildRecord {
    : never;
  }
}
```

调整代码，然后添加`pay`

``` diff
declare module 'vona' {
  export interface ILoggerChildRecord {
+   pay: never;
  }
}
```

## 日志分级

可以基于分级控制写入日志文件的内容

### 1. 分级

VonaJS 采用 NPM 分级规则，参见: [RFC5424](https://tools.ietf.org/html/rfc5424)

``` typescript
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};
```

### 2. 输出方法

与分级对应的是一组输出方法

``` typescript
this.$logger.error('test');
this.$logger.warn('test');
this.$logger.info('test');
this.$logger.http('test');
this.$logger.verbose('test');
this.$logger.debug('test');
this.$logger.silly('test');
```

### 3. 默认分级

VonaJS 的默认分级是`info`，从而可以控制只有`<=info`的分级日志才写入文件

我们在新建`order` Client，可以通过`makeTransportFile`方法实现此策略

``` diff
// logger
config.logger = {
  clients: {
    order(this: VonaApplication, clientInfo) {
      const transports = [
+       this.meta.logger.makeTransportFile(clientInfo, 'order'),
        this.meta.logger.makeTransportConsole(clientInfo),
      ].filter(item => !!item);
      return { transports };
    },
  },
};
```

如果需要强制某个分级的日志写入独立的文件，可以再增加一个文件通道。比如，将`debug`分级的日志写入文件`order-debug`中

``` diff
// logger
config.logger = {
  clients: {
    order(this: VonaApplication, clientInfo) {
      const transports = [
+       this.meta.logger.makeTransportFile(clientInfo, 'order-debug', 'debug'),
        this.meta.logger.makeTransportFile(clientInfo, 'order'),
        this.meta.logger.makeTransportConsole(clientInfo),
      ].filter(item => !!item);
      return { transports };
    },
  },
};
```

对于控制台通道，有一个特殊约定：凡是`silly`分级的日志，都会输出到控制台。因此，通过`makeTransportConsole`方法实现此策略

``` diff
// logger
config.logger = {
  clients: {
    order(this: VonaApplication, clientInfo) {
      const transports = [
        this.meta.logger.makeTransportFile(clientInfo, 'order'),
+       this.meta.logger.makeTransportConsole(clientInfo),
      ].filter(item => !!item);
      return { transports };
    },
  },
};
```

### 4. 分级配置

可以通过.env 文件修改默认的分级配置

* Client: `default`

``` typescript
LOGGER_CLIENT_DEFAULT = 
```

支持如下值：`(empty)/true/false/{level}`

比如，希望`<=debug`分级的日志写入文件，那么，配置如下:

``` typescript
LOGGER_CLIENT_DEFAULT = debug
```

也可以直接在控制台设置环境变量:

``` bash
LOGGER_CLIENT_DEFAULT=debug npm run dev
```

* Client: `order`

对于新增的 Client `order`，也可以设置默认分级：

``` typescript
LOGGER_CLIENT_ORDER = verbose
```

### 5. 获取当前分级

在系统运行中可以获取当前分级：

``` typescript
class ControllerStudent {
  async test() {
    // logger: default
    const levelDefault = this.bean.logger.getLevel();
    // logger: order
    const levelOrder = this.bean.logger.getLevel('order');
  }
}  
```

### 6. 动态修改分级

在系统运行中可以动态修改分级，从而在不停机、不重启的情况下，随时控制基于分级的写入策略

当调用`setLevel`方法时，系统会自动广播至所有 Workers，修改每个工作进程中的当前分级

``` typescript
class ControllerStudent {
  async test() {
    // level: info
    let levelDefault = this.bean.logger.getLevel();
    assert.equal(levelDefault, 'info');
    this.$logger.debug('1: this line will not output');
    // level: debug
    this.bean.logger.setLevel('debug');
    levelDefault = this.bean.logger.getLevel();
    assert.equal(levelDefault, 'debug');
    this.$logger.debug('2: this line will output');
    // disable
    this.bean.logger.setLevel(false);
    levelDefault = this.bean.logger.getLevel();
    assert.equal(levelDefault, false);
    this.$logger.info('3: this line will not output');
    this.$logger.debug('4: this line will not output');
    // enable
    this.bean.logger.setLevel(true);
  }
}  
```
