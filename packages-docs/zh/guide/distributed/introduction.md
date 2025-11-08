# 分布式组件

为了支持分布式开发，VonaJS 基于`Redis`提供了以下核心组件:

- `广播`: 可以向系统的多个工作进程发送广播，从而让每个工作进程执行业务逻辑
- `队列`: 基于[BullMQ](https://github.com/taskforcesh/bullmq)提供了强大的队列组件
- `分布式锁`: 基于[Redlock](https://github.com/sesamecare/redlock/)提供了直观、易用的分布式锁
- `定时任务`: 基于[BullMQ](https://github.com/taskforcesh/bullmq)提供了直观、易用的定时任务。因为定时任务是队列的特例
- `启动项`: 允许在系统启动时或者实例初始化时，执行初始化逻辑

## Redis配置

这些分布式组件默认使用相同的 Redis 配置，可以在`.env`文件中配置：

`env/.env`

``` typescript
# redis

REDIS_DEFAULT_HOST = 127.0.0.1
REDIS_DEFAULT_PORT = 6379
REDIS_DEFAULT_PASSWORD =
REDIS_DEFAULT_DB = 0
```

## 独立配置

对于大型项目，可以为不同的组件提供独立的配置

`src/backend/config/config/config.ts`

``` typescript
// redis
config.redis = {
  clients: {
    // broadcast
    broadcast: {
      host: 'host1',
    },
    // queue/schedule
    queue: {
      host: 'host2',
    },
    // redlock
    redlock: {
      host: 'host3',
    },
  },
};
```
