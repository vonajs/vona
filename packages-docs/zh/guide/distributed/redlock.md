# 分布式锁

VonaJS 基于[Redlock](https://github.com/sesamecare/redlock/)提供了直观、易用的的分布式锁

## 创建分布式锁

比如，在模块 demo-student 中创建分布式锁

### 1. Cli命令

``` bash
$ vona :create:bean queue add --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Bean/Queue`
:::

## 分布式定义

``` typescript
export interface TypeQueueAddJobData { a: number; b: number }

export type TypeQueueAddJobResult = number;

@Queue()
export class QueueAdd
  extends BeanQueueBase<TypeQueueAddJobData, TypeQueueAddJobResult>
  implements IQueueExecute<TypeQueueAddJobData, TypeQueueAddJobResult> {
  async execute(data: TypeQueueAddJobData, _options?: IQueuePushOptions): Promise<TypeQueueAddJobResult> {
    return data.a + data.b;
  }
}
```

- `TypeQueueAddJobData`: 定义任务数据
- `TypeQueueAddJobResult`: 定义任务结果
- `execute`: 执行任务

* execute 参数

|名称|说明|
|--|--|
|data|任务数据|
|options|任务参数|


