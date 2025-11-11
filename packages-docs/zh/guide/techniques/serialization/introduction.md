# 序列化

VonaJS 提供了`序列化`能力，可以对 API 的响应数据进行转换，比如：排除密码字段，对 Email 和 Mobile 进行脱敏处理，等等

先介绍通用的序列化机制，再介绍一组工具函数。通过工具函数可以更加便利的使用序列化能力

## 创建SerializerTransform

比如，在模块 demo-student 中创建一个 SerializerTransform: `upper`，将字段值转化为大写

### 1. Cli命令

``` bash
$ vona :create:bean middleware logger --module=demo-student --boilerplate=global
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

与局部中间件不同，系统会自动加载全局中间件，并使其生效

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

- 在使用中间件时直接提供参数值即可

### 5. App Config配置

可以在 App Config 中配置中间件参数

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
