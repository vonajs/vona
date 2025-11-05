# 分布式锁

VonaJS 基于[Redlock](https://github.com/sesamecare/redlock/)提供了直观、易用的分布式锁

## 创建分布式锁

比如，在模块 demo-student 中创建分布式锁

### 1. Cli命令

``` bash
$ vona :create:bean meta redlock --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Meta/Redlock`
:::

## 分布式锁定义

``` typescript
export interface MetaRedlock {}

@Meta()
export class MetaRedlock extends BeanRedlockBase {}
```

- `MetaRedlock`: 定义需要提供的锁资源

## 定义锁资源

当我们使用分布式锁时，需要指定对应的锁资源。那么，可以采用接口合并机制直接在`MetaRedlock`中定义锁资源

比如，定义锁资源`name`:

``` diff
class MetaRedlock {
+ lock<RESULT>(resource: 'name', fn: FunctionAsync<RESULT>, options?: IRedlockLockOptions): Promise<RESULT>;
}
```

## 使用分布式锁

``` typescript
class ControllerStudent {
  async test() {
    const res = await this.scope.redlock.lock('name', async () => {
      // do nothing in lock
      return 'some result';
    });
  }
}  
```

- `redlock.lock`：传入锁资源`name`

## `lock/lockIsolate`

VonaJS 提供了两个锁方法: `lock/lockIsolate`。二者的区别是：`lockIsolate`自动实现了`数据源分级`，从而避免因数据源竞争而导致的死锁情况

- 参见: [数据源分级](./queue/db-level.md)

### 定义锁资源: lockIsolate

为`lockIsolate`方法定义锁资源:

``` diff
class MetaRedlock {
+ lockIsolate<RESULT>(
+   resource: 'name',
+   fn: FunctionAsync<RESULT>,
+   options?: IRedlockLockIsolateOptions,
+ ): Promise<RESULT>;
}
```

### 使用分布式锁: lockIsolate

``` typescript
class ControllerStudent {
  async test() {
    const res = await this.scope.redlock.lockIsolate('name', async () => {
      // do nothing in lock
      return 'some result';
    });
  }
}  
```

## 定义锁资源: 字面量模版

锁资源还可以是`字面量模版`

比如，如果要为不同的用户单独提供锁资源，那么可以使用形如`user-${userId}`的字符串，作为锁资源名称

``` diff
class MetaRedlock {
+ lockIsolate<RESULT, KEY extends string>(
+   resource: `user-${KEY}`,
+   fn: FunctionAsync<RESULT>,
+   options?: IRedlockLockIsolateOptions,
+ ): Promise<RESULT>;
}
```

这样，在使用`lockIsolate`方法时同样可以提供类型提示

``` typescript
class ControllerStudent {
  async test() {
    const userId = 1;
    const res = await this.scope.redlock.lockIsolate(`user-${userId}`, async () => {
      // do nothing in lock
      return 'some result';
    });
  }
}  
```

