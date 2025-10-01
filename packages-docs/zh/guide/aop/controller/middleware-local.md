# 局部中间件

## 创建中间件

比如，在模块 demo-student 中创建一个 局部中间件: `logger`

### 1. Cli命令

``` bash
$ vona :create:bean middleware logger --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Aspect/Middleware`
:::

## 中间件定义

``` typescript
export interface IMiddlewareOptionsLogger extends IDecoratorMiddlewareOptions {}

@Middleware<IMiddlewareOptionsLogger>()
class MiddlewareLogger {
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

### 1. 标注控制器方法

``` diff
import { Aspect } from 'vona-module-a-aspect';

@Controller()
class ControllerStudent {
  @Web.get()
+ @Aspect.middleware('demo-student:logger')
  async findMany() {}
}
```

- `@Aspect.middleware`: 此装饰器用于使用局部中间件，只需传入中间件的名称
  - logger 中间件属于模块`demo-student`，因此完整的名称是`demo-student:logger`




      1. 创建中间件
      

      2. 使用中间件
        1. 标注controller action
        2. 标注controller
      3. 中间件参数
        1. 参数类型定义
        2. 提供默认参数
        3. 使用时指定参数
        4. App config配置
      4. 中间件顺序
        1. dependencies
        2. dependents
      5. 中间件启用/禁用
        1. Enable
        2. Meta: flavor/mode/instanceName/host
        3. match/ignore
      6. 如何查询当前生效的中间件清单
        1. 直接在controller action方法中调用inspect方法即可
   
