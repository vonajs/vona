# Redis

VonaJS 基于[ioredis](https://github.com/redis/node-redis)提供了强大而灵活的 Redis 客户端

## App Config配置

可以在 App Config 中进行 Redis 配置：

`src/backend/config/config/config.ts`

``` typescript
// redis
config.redis = {
  base: {
    host: env.REDIS_DEFAULT_HOST,
    port: Number.parseInt(env.REDIS_DEFAULT_PORT!),
    password: env.REDIS_DEFAULT_PASSWORD,
    db: Number.parseInt(env.REDIS_DEFAULT_DB!),
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  },
  clients: {
    default: { keyPrefix: getRedisClientKeyPrefix('default', appInfo) },
    cache: { keyPrefix: getRedisClientKeyPrefix('cache', appInfo) },
    io: { keyPrefix: getRedisClientKeyPrefix('io', appInfo) },
    summer: { keyPrefix: getRedisClientKeyPrefix('summer', appInfo) },
    model: { keyPrefix: getRedisClientKeyPrefix('model', appInfo) },
    redlock: {},
    queue: {},
    broadcast: {},
  },
};
```

|名称|说明|
|--|--|
|base|基础配置，为所有Clients提供通用的基础配置|
|clients|配置多个Clients。针对不同应用场景，系统提供了大量内置的Clients|

- `keyPrefix`: 为 Client 提供`keyPrefix`，从而实现键值空间的隔离
  - 比如，在本机有多个 VonaJS 项目，使用同一个 Redis 服务，因为提供了不同的`keyPrefix`，从而确保多个 VonaJS 项目不会相互干扰
  - `redlock/queue/broadcast`在内部提供了`keyPrefix`能力，因此不必在配置文件中设置

## env配置

可以在 env 文件中提供`base`配置：

`env/.env`

``` typescript
# redis
REDIS_DEFAULT_HOST = 127.0.0.1
REDIS_DEFAULT_PORT = 6379
REDIS_DEFAULT_PASSWORD = 
REDIS_DEFAULT_DB = 0
```

## 添加新Client

### 1. 添加类型定义

采用接口合并机制添加新 Client 的类型定义，比如`order`，为订单业务提供独立的 Redis Client，使用独立的 Redis 服务，从而提升系统性能

在 VSCode 编辑器中，输入代码片段`recordredisclient`，自动生成代码骨架:

``` typescript
declare module 'vona-module-a-redis' {
  export interface IRedisClientRecord {
    : never;
  }
}
```

调整代码，然后添加`order`

``` diff
declare module 'vona-module-a-redis' {
  export interface IRedisClientRecord {
+   order: never;
  }
}
```

### 2. 增加Client配置

`src/backend/config/config/config.ts`

``` typescript
// redis
config.redis = {
  clients: {
    order: {
      keyPrefix: getRedisClientKeyPrefix('order', appInfo),
      host: 'xx.xx.xx.xx',
      port: 6379,
      password: 'xxxxxx',
    },
  },
};
```

## 获取Redis Client实例

``` typescript
class ControllerStudent {
  @Web.get('test')
  async test() {
    const redisDefault = this.bean.redis.get('default');
    const redisCache = this.bean.redis.get('cache');
    const redisOrder = this.bean.redis.get('order');
  }
}
```

## 使用Redis Client

``` diff
class ControllerStudent {
  @Web.get('test')
  async test() {
    const redisOrder = this.bean.redis.get('order');
+   await redisOrder.set('order1', JSON.stringify({ id: '1', name: 'Order1' }));
+   const value = await redisOrder.get('order1');
    const order = value ? JSON.parse(value) : undefined;
    assert.deepEqual(order, { id: '1', name: 'Order1' });
  }
}
```

- 更多用法，参见：[ioredis](https://github.com/redis/node-redis)

## 分布式组件

为了支持分布式开发，VonaJS 基于`Redis`提供了以下核心组件:

- `广播`: 可以向系统的多个工作进程发送广播，从而让每个工作进程执行业务逻辑
- `队列`: 基于[BullMQ](https://github.com/taskforcesh/bullmq)提供了强大的队列组件
- `分布式锁`: 基于[Redlock](https://github.com/sesamecare/redlock/)提供了直观、易用的分布式锁
- `定时任务`: 基于[BullMQ](https://github.com/taskforcesh/bullmq)提供了直观、易用的定时任务。因为定时任务是队列的特例
- `启动项`: 允许在系统启动时或者实例初始化时，执行初始化逻辑

参见: [分布式组件](../../distributed/introduction.md)
