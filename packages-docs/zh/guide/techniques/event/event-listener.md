# 事件监听器

一个`事件`可以有多个`事件监听器`，这些`事件监听器`在执行时采用洋葱模型

## 创建Event Listener

比如，在模块 demo-student 中创建一个 Event Listener: `echo`，在响应事件时，将事件参数`Hello World`添加`!`后缀，并将新参数传入`next`方法

### 1. Cli命令

``` bash
$ vona :create:bean eventListener echo --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Bean/Event Listener`
:::

## Event Listener定义

### 1. 自动生成的代码骨架

``` typescript
type TypeEventData = unknown; // TypeEventEchoData;
type TypeEventResult = unknown; // TypeEventEchoResult;

@EventListener({ match: 'some-module:echo' })
export class EventListenerEcho
  extends BeanBase
  implements IEventExecute<TypeEventData, TypeEventResult> {
  async execute(_data: TypeEventData, next: NextEvent<TypeEventData, TypeEventResult>): Promise<TypeEventResult> {
    // next
    return next();
  }
}
```

- `TypeEventData`: 定义参数类型
- `TypeEventResult`: 定义结果类型
- `match`: 指定监听哪个事件

### 2. 调整代码

``` diff
+ import type { TypeEventEchoData, TypeEventEchoResult } from './event.echo.ts';

+ type TypeEventData = TypeEventEchoData;
+ type TypeEventResult = TypeEventEchoResult;

+ @EventListener({ match: 'demo-student:echo' })
export class EventListenerEcho
  extends BeanBase
  implements IEventExecute<TypeEventData, TypeEventResult> {
+ execute(data: TypeEventData, next: NextEventSync<TypeEventData, TypeEventResult>): TypeEventResult {
+   const dataNew = `${data}!`;
    // next
+   return next(dataNew);
  }
}
```

- `TypeEventData`: 定义参数类型
- `TypeEventResult`: 定义结果类型
- `match`: 指定需要监听的事件名`demo-student:echo`
- `execute`: 为了同时支持`异步事件`和`同步事件`，改为同步方法
  - `next`:类型改为`NextEventSync`
- `dataNew`: 生成新的事件参数值，并传入`next`方法

## 查看事件监听器清单

可以直接输出某个事件的事件监听器清单

``` diff
class ControllerStudent {
  @Web.get('test')
  test() {
+   this.bean.onion.eventListener.inspectEventListener('demo-student:echo');
  }
}
```

- `this.bean.onion`: 取得全局 Service 实例 `onion`
- `.eventListener`: 取得与 Event Listener 相关的 Service 实例
- `.inspectEventListener`: 输出某个事件的事件监听器清单，传入事件名`demo-student:echo`

当访问`test` API 时，会自动在控制台输出事件监听器清单，效果如下：

![](../../../assets/img/event/eventListener-1.png)
