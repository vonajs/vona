# 队列

VonaJS 基于[BullMQ](https://github.com/taskforcesh/bullmq)提供了强大的队列组件

## 创建队列

比如，在模块 demo-student 中创建一个队列: `add`，将传入的参数作加法运算

### 1. Cli命令

``` bash
$ vona :create:bean queue add --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Bean/Queue`
:::

## 队列定义

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


## 创建任务

### 1. 没有返回值

``` typescript
class ControllerStudent {
  test() {
    const data = { a: 1, b: 2 };
    this.scope.queue.add.push(data);
  }
}  
```

- `this.scope.queue.add`: 通过模块 scope 取得队列实例
- `push`: 推送任务，不需要等待结果返回

### 2. 有返回值

``` typescript
class ControllerStudent {
  async test() {
    const data = { a: 1, b: 2 };
    const result = await this.scope.queue.add.pushAsync(data);
    console.log(result);
  }
}  
```

- `this.scope.queue.add`: 通过模块 scope 取得队列实例
- `pushAsync`: 推送任务，可以等待结果返回

