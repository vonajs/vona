# 广播

可以向系统的多个工作进程发送广播，从而让每个工作进程执行业务逻辑

## 创建广播

比如，在模块 demo-student 中创建一个广播: `echo`，让每个工作进程在控制台输出`Hello world`

### 1. Cli命令

``` bash
$ vona :create:bean broadcast echo --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Bean/Broadcast`
:::

## 广播定义

``` typescript
export interface TypeBroadcastEchoJobData { message: string }

@Broadcast()
export class BroadcastEcho
  extends BeanBroadcastBase<TypeBroadcastEchoJobData>
  implements IBroadcastExecute<TypeBroadcastEchoJobData> {
  async execute(data: TypeBroadcastEchoJobData, isEmitter?: boolean) {
    if (!isEmitter) {
      console.log(`pid: ${process.pid} message: ${data.message}`);
    }
  }
}
```

- `TypeBroadcastEchoJobData`: 定义广播数据
- `execute`: 在控制台输出消息

* execute 参数

|名称|说明|
|--|--|
|data|广播数据|
|isEmitter|是否是发送广播的工作进程|

## 发送广播

``` typescript
class ControllerStudent {
  test() {
    const data = { message: 'Hello world' };
    console.log(`pid: ${process.pid} message: ${data.message}`);
    this.scope.broadcast.echo.emit(data);
  }
}  
```

- `this.scope.broadcast.echo`: 通过模块 scope 取得广播实例
- `emit`: 发送广播，传入广播数据

::: tip
如果在当前工作进程已经执行了业务逻辑，那么在`execute`方法中就可以判断`isEmitter`忽略掉发送广播的工作进程
:::

## 广播参数

可以为广播配置参数

``` typescript
@Broadcast({
  instance: true,
  transaction: true,
})
class BroadcastEcho {}
```

|名称|说明|
|--|--|
|instance|是否启用实例|
|transaction|是否启用数据库事务|

- `instance`: VonaJS 支持多`实例/多租户`，不同的实例有隔离的数据和状态。如果广播的业务逻辑需要操作实例数据，则需要设置`instance: true`，以便系统初始化实例数据，然后调用广播的`execute`方法
- `transaction`: 如果设置为 true，系统会自动将广播的`execute`方法放入数据库事务当中