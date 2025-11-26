# Mem缓存

## 创建Mem缓存

比如，在模块 demo-student 中创建一个 Mem 缓存: `student`，用于缓存学生数据

### 1. Cli命令

``` bash
$ vona :create:bean middleware logger --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Aspect/Middleware`
:::

## Mem缓存定义

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

- `IMiddlewareOptionsLogger`: 定义 Mem 缓存参数
- `execute`: 输出执行时长

## 使用Mem缓存

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

- `@Aspect.middleware`: 此装饰器用于使用局部 Mem 缓存，只需传入 Mem 缓存的名称
  - logger Mem 缓存属于模块`demo-student`，因此完整的名称是`demo-student:logger`

### 2. 标注控制器类

可以针对控制器类使用 Mem 缓存，从而类中所有方法都会应用此 Mem 缓存

``` diff
import { Aspect } from 'vona-module-a-aspect';

@Controller()
+ @Aspect.middleware('demo-student:logger')
class ControllerStudent {
  @Web.get()
  async findMany() {}
}
```

