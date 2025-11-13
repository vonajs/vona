# 事件监听器

一个`事件`可以有多个`事件监听器`，这些`事件监听器`在执行时采用洋葱模型

## 创建Event Listener

比如，在模块 demo-student 中创建一个 Event: `echo`，触发事件时传入事件参数`Hello World`

### 1. Cli命令

``` bash
$ vona :create:bean event echo --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Bean/Event`
:::

## Event定义

``` typescript
export type TypeEventEchoData = string;

export type TypeEventEchoResult = string | undefined;

@Event()
export class EventEcho extends BeanEventBase<
  TypeEventEchoData,
  TypeEventEchoResult
> {}
```

- `TypeEventEchoData`: 定义参数类型
- `TypeEventEchoResult`: 定义结果类型
