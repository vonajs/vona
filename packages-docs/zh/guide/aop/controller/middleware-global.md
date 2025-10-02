# 全局中间件

## 创建中间件

比如，在模块 demo-student 中创建一个 全局中间件: `logger`

### 1. Cli命令

``` bash
$ vona :create:bean middleware logger --module=demo-student --boilerplate=cli/middlewareGlobal/boilerplate
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Aspect/Middleware Global`
:::

## 中间件定义

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

- `IMiddlewareOptionsLogger`: 定义中间件参数
- `execute`: 输出执行时长

## 使用中间件

与局部中间件不同，系统会自动加载全局中间件，并使其失效

## 中间件参数

可以为中间件定义参数，通过参数更灵活的配置中间件逻辑

比如，为 logger 中间件定义`prefix`参数，用于控制输出格式

### 1. 定义参数类型

``` diff
export interface IMiddlewareOptionsLogger extends IDecoratorMiddlewareOptionsGlobal {
+ prefix: string;
}
```
### 2. 提供参数缺省值

``` diff
@Middleware<IMiddlewareOptionsLogger>({
  global: true,
+ prefix: 'time',
})
```

### 3. 使用参数

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

### 4. 使用时指定参数

可以针对某个 API 单独指定全局中间件的参数

``` diff
class ControllerStudent {
  @Web.get()
+ @Aspect.middlewareGlobal('demo-student:logger', { prefix: 'elapsed' })
  async findMany() {}
}
```

在使用中间件时直接提供参数值即可

### 5. App config配置

可以在 App config 中配置中间件参数

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

### 6. 参数优先级

`使用时指定参数` > `App config配置` > `参数缺省值`

## 中间件顺序

由于全局中间件是默认加载并生效的，所以，VonaJS 提供了两个参数，用于控制中间件的加载顺序

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

2. Meta: flavor/mode/instanceName/host
        3. match/ignore
    
      5. 中间件启用/禁用
        1. Enable
        2. Meta: flavor/mode/instanceName/host
        3. match/ignore
      6. 如何查询当前生效的中间件清单
        1. 直接在controller action方法中调用inspect方法即可
    