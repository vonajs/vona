# Election

如果需要在后端开启一个服务，在 VonaJS 中该如何实现呢？

由于 VonaJS 是分布式架构，后端可以开启多个 Workers。那么，应该在哪个 Worker 中开启服务呢？

VonaJS 针对此场景提供了 Election，工作原理如下：

1. 所有 Workers 都会参与竞争，选取约定数量的 Workers
2. 这些被选中的 Workers 将开启服务
3. 如果某个选中的 Worker 异常终止，那么其他 Workers 就会继续竞争，直到选出约定数量的 Workers

## 创建meta.election

比如，在模块 demo-student 中创建`meta.election`。在选中的 Worker 中启动一个定时器，每隔 2 秒输出`Hello World`

### 1. Cli命令

``` bash
$ vona :create:bean meta election --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Meta/Election`
:::

## meta.election定义

``` typescript
export type TypeElectionObtainResource = 'echo';

@Meta()
export class MetaElection extends BeanElectionBase<TypeElectionObtainResource> {}
```

- `TypeElectionObtainResource`: 定义 Election 资源的类型

## 创建 Module Monkey

接下来创建`Module Monkey`，响应`appStarted`和`appClose`钩子

-- 参见: [应用启动自定义](../../env-config/app-start/introduction.md)

``` typescript
export class Monkey extends BeanSimple implements IMonkeyAppStarted, IMonkeyAppClose {
  private _fnRelease: FunctionAsync<void> | undefined;

  async appStarted() {
    const scope = this.app.scope(__ThisModule__);
    scope.election.obtain('echo', fnRelease => {
      this._fnRelease = fnRelease;
      this._doCustomLogic();
    });
  }

  async appClose() {
    this._fnRelease?.();
  }

  private _doCustomLogic() {
    setInterval(() => {
      console.log('Hello World, pid: ', process.pid);
    }, 2000);
  }
}
```

- `_fnRelease`: 此变量是一个函数，用于释放所有权
- `appStarted`: 调用`election.obtain`获取指定资源的所有权。当取得所有权就会调用回调函数。该回调函数提供一个`fnRelease`参数，用于后续释放所有权
- `appClose`: 释放所有权，以便其他 Workers 参与后续的竞争
- `_doCustomLogic`: 实现自定义的逻辑或者服务