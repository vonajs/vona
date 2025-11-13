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

## Event定义

* 自动生成的代码骨架

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

* 调整代码


