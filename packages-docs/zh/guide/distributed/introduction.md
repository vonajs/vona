# 分布式组件

使用 VonaJS 框架开发的系统，天然具备分布式能力。因为 VonaJS 基于`Redis`提供了以下核心组件: `广播、队列、分布式锁、定时任务、启动项`

## Redis配置

这些分布式组件默认使用同一个 Redis Client，可以在`.env`文件中配置：

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
    // queue/Schedule
    queue: {
      host: 'host2',
    },
    // Redlock
    redlock: {
      host: 'host3',
    },
  },
};
```
