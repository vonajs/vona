# 分布式锁

VonaJS 基于[Redlock](https://github.com/sesamecare/redlock/)提供了直观、易用的的分布式锁

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

## 分布式定义

``` typescript
export interface MetaRedlock {}

@Meta()
export class MetaRedlock extends BeanRedlockBase {}
```

- `MetaRedlock`: 定义需要提供的锁资源

## 定义锁资源

当我们使用分布式锁时，需要指定对应的锁资源。那么，可以采用接口合并机制直接在`MetaRedlock`中定义锁资源

比如，定义锁资源`name`:

``` typescript

```




