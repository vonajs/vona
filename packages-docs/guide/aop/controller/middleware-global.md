# Global Middleware

## Create Middleware

For example, we create a Global Middleware `logger` in the module demo-student

### 1. Cli command

``` bash
$ vona :create:bean middleware logger --module=demo-student --boilerplate=cli/middlewareGlobal/boilerplate
```

### 2. Menu command

::: tip
Context Menu - [Module Path]: `Vona Aspect/Middleware Global`
:::

## Middleware Definition

``` typescript
export interface IMiddlewareOptionsLogger extends IDecoratorMiddlewareOptionsGlobal {}

@Middleware<IMiddlewareOptionsLogger>({ global: true })
export class MiddlewareLogger extends BeanBase implements IMiddlewareExecute {
  async execute(_options: IMiddlewareOptionsLogger, next: Next) {
    const timeBegin = Date.now();
    const res = await next();
    const timeEnd = Date.now();
    console.log('time: ', timeEnd - timeBegin);
    return res;
  }
}
```

- `IMiddlewareOptionsLogger`: Defines middleware parameters
- `execute`: Outputs execution time

## Using Middleware

Unlike local middleware, the system automatically loads global middlewares and makes them effective

## Middleware Parameters

You can define parameters for middleware, allowing for more flexible configuration of middleware logic

For example, define the `prefix` parameter for the logger middleware to control the output format

### 1. Defining parameter types

``` diff
export interface IMiddlewareOptionsLogger extends IDecoratorMiddlewareOptionsGlobal {
+ prefix: string;
}
```

### 2. Providing default values ​​for parameters

``` diff
@Middleware<IMiddlewareOptionsLogger>({
  global: true,
+ prefix: 'time',
})
```

### 3. Using Parameters

``` diff
export interface IMiddlewareOptionsLogger extends IDecoratorMiddlewareOptionsGlobal {
  prefix: string;
}

@Middleware<IMiddlewareOptionsLogger>({
  global: true,
  prefix: 'time',
})
class MiddlewareLogger {
  async execute(options: IMiddlewareOptionsLogger, next: Next) {
    const timeBegin = Date.now();
    const res = await next();
    const timeEnd = Date.now();
-   console.log('time: ', timeEnd - timeBegin);
+   console.log(`${options.prefix}: `, timeEnd - timeBegin);
    return res;
  }
}
```

### 4. Specify parameters when using

``` diff
class ControllerStudent {
  @Web.get()
+ @Aspect.middlewareGlobal('demo-student:logger', { prefix: 'elapsed' })
  async findMany() {}
}
```

- When using middleware, just provide the parameter value directly

### 5. App config

Middleware parameters can be configured in App config

`src/backend/config/config/config.ts`

``` typescript
// onions
config.onions = {
  middleware: {
    'demo-student:logger': {
      prefix: 'elapsed',
    },
  },
};
```

### 6. Parameters precedence

`Specify parameters when using` > `App config` > `Default values`

## Middleware Order

Since global middlewares ard loaded and enabled by default, VonaJS provides two parameters to control the order in which middleware is loaded

### 1. dependencies

比如，系统有一个内置全局中间件`a-instance:instance`，我们希望加载顺序如下：`a-instance:instance` > `Current`

``` diff
@Middleware({
  global: true,
+ dependencies: 'a-instance:instance',
  prefix: 'time',
})
class MiddlewareLogger {}
```

### 2. dependents

`dependents`的顺序刚好与`dependencies`相反，我们希望加载顺序如下：`Current` > `a-instance:instance`

``` diff
@Middleware({
  global: true,
+ dependents: 'a-instance:instance',
  prefix: 'time',
})
class MiddlewareLogger {}
```

## 中间件启用/禁用

可以针对某些 API 控制全局中间件的`启用/禁用`

### 1. Enable

* 针对某个 API 禁用

``` diff
class ControllerStudent {
  @Web.get()
+ @Aspect.middlewareGlobal('demo-student:logger', { enable: false })
  async findMany() {}
}
```

* 针对所有 API 禁用

`src/backend/config/config/config.ts`

``` diff
// onions
config.onions = {
  middleware: {
    'demo-student:logger': {
+     enable: false,
    },
  },
};
```

### 2. Meta

可以让全局中间件在指定的运行环境生效

|名称|类型|说明|
|--|--|--|
|flavor|string\|string[]|参见: [运行环境与Flavor](../../techniques/mode-flavor/introduction.md)|
|mode|string\|string[]|参见: [运行环境与Flavor](../../techniques/mode-flavor/introduction.md)|
|instanceName|string\|string[]|参见: [多实例/多租户](../../techniques/instance/introduction.md)|
|host|string\|string[]|主机名|

* 举例

``` diff
@Middleware({
  global: true,
+ meta: {
+   flavor: 'normal',
+   mode: 'dev',
+   instanceName: '',
+   host: 'localhost:7102',
+ },
})
class MiddlewareLogger {}
```

### 3. match/ignore
    
可以针对指定的 API 启用/禁用全局中间件

|名称|类型|说明|
|--|--|--|
|match|string\|regexp\|(string\|regexp)[]|针对哪些API启用|
|ignore|string\|regexp\|(string\|regexp)[]|针对哪些API禁用|

## 查看当前生效的全局中间件清单

可以直接在 Controller action 方法中输出当前生效的全局中间件清单

``` diff
class ControllerStudent {
  @Web.get()
  async findMany() {
+   this.bean.onion.middleware.inspect();
  }
}
```

- `this.bean.onion`: 取得全局 Service 实例 `onion`
- `.middleware`: 取得与中间件相关的 Service 实例
- `.inspect`: 输出当前生效的全局中间件清单

当访问`findMany` API 时，会自动在控制台输出当前生效的全局中间件清单，效果如下：

![](../../../assets/img/aop/middleware-1.png)
