# 事件

VonaJS 提供了事件机制，由`事件`和`事件监听器`组成

## 创建Event

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

export type TypeEventEchoResult = boolean;

@Event()
export class EventEcho extends BeanEventBase<
  TypeEventEchoData,
  TypeEventEchoResult
> {}
```

- `TypeEventEchoData`: 定义参数类型
- `TypeEventEchoResult`: 定义结果类型

## 触发事件 使用SerializerTransform

比如学生 API`findOne`方法返回的结果类型是`EntityStudent`。下面将`EntityStudent`的`name`字段转为大写

### 1. 开启序列化

需要为 API 开启序列化

``` diff
class ControllerStudent {
  @Web.get(':id')
  @Api.body(v.optional(), v.object(EntityStudent))
+ @Serializer.enable()
  async findOne(id) {
    return await this.scope.service.student.findOne(id);
  }
}
```

- `@Serializer.enable`: 开启序列化

### 2. 设置字段

``` diff
class EntityStudent {
+ @Serializer.transform('demo-student:upper')
  @Api.field(v.title($locale('Name')), v.default(''), v.min(3))
  name: string;
}
```
