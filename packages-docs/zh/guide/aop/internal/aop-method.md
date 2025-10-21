# AOP Method

`AOP Method`允许我们直接在 Class Method 上通过装饰器切入逻辑

## 创建AOP Method

比如，在模块 demo-student 中创建一个 AOP Method: `log`，用于输出方法的执行时长

### 1. Cli命令

``` bash
$ vona :create:bean aopMethod log --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Aspect/Aop Method`
:::

## AOP Method定义

``` typescript
export interface IAopMethodOptionsLog extends IDecoratorAopMethodOptions {}

@AopMethod<IAopMethodOptionsLog>()
class AopMethodLog {
  async execute(_options: IAopMethodOptionsLog, _args: [], next: Next | NextSync, _receiver: any, _prop: string): Promise<any> {
    const timeBegin = Date.now();
    const res = await next();
    const timeEnd = Date.now();
    console.log('time:', timeEnd - timeBegin);
    return res;
  }
}
```

- `IAopMethodOptionsLog`: 定义 AOP Method 参数
- `execute`: 输出执行时长

## 使用AOP Method

可以在任何 Class 的任何方法上使用 AOP Method

### 1. 标注Controller方法

``` diff
import { Aspect } from 'vona-module-a-aspect';

@Controller()
class ControllerStudent {
  @Web.get()
+ @Aspect.aopMethod('demo-student:log')
  async findMany() {}
}
```

### 2. 标注Service方法

``` diff
import { Aspect } from 'vona-module-a-aspect';

@Service()
class ServiceStudent {
+ @Aspect.aopMethod('demo-student:log')
  async findMany(){}
```

## 中间件参数

可以为中间件定义参数，通过参数更灵活的配置中间件逻辑

比如，为 logger 中间件定义`prefix`参数，用于控制输出格式

### 1. 定义参数类型

``` diff
export interface IMiddlewareOptionsLogger extends IDecoratorMiddlewareOptions {
+ prefix: string;
}
```

### 2. 提供参数缺省值

``` diff
@Middleware<IMiddlewareOptionsLogger>({
+ prefix: 'time',
})
```

### 3. 使用参数

``` diff
export interface IMiddlewareOptionsLogger extends IDecoratorMiddlewareOptions {
  prefix: string;
}

@Middleware<IMiddlewareOptionsLogger>({
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

可以针对某个 API 单独指定局部中间件的参数

``` diff
class ControllerStudent {
  @Web.get()
+ @Aspect.middleware('demo-student:logger', { prefix: 'elapsed' })
  async findMany() {}
}
```

- 在使用中间件时直接提供参数值即可

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
