# Redis

VonaJS provides a powerful and flexible Redis capabilities based on [ioredis](https://github.com/redis/node-redis)

## App Config

Redis configuration can be modified in the App Config:

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
    default: { keyPrefix: true },
    cache: { keyPrefix: true },
    io: { keyPrefix: true },
    summer: { keyPrefix: true },
    model: { keyPrefix: true },
    redlock: {},
    queue: {},
    broadcast: {},
  },
};
```

|Name|Description|
|--|--|
|base|Basic configuration, providing common foundational settings for all Clients|
|clients|Configures multiple Clients. For different application scenarios, the system offers a large number of built-in Clients|

- `keyPrefix`: Provides a `keyPrefix` for the Client to achieve keyspace isolation
  - For example, if there are multiple VonaJS projects on the same machine using the same Redis service, providing different `keyPrefix` values ensures that the projects do not interfere with each other
  - `redlock/queue/broadcast` internally provides `keyPrefix` capability, so there is no need to set it in the configuration file

## env

You can provide `base` configuration in the env file:

`env/.env`

``` typescript
# redis
REDIS_DEFAULT_HOST = 127.0.0.1
REDIS_DEFAULT_PORT = 6379
REDIS_DEFAULT_PASSWORD = 
REDIS_DEFAULT_DB = 0
```

## Adding a New Client

### 1. Adding Type Definition

Add a new Client type definition using the interface merging mechanism, such as `order`, providing a separate Redis Client for the order business using a dedicated Redis service, thereby improving system performance

In the VSCode editor, enter the code snippet `recordredisclient`, and the code skeleton will be automatically generated:

``` typescript
declare module 'vona-module-a-redis' {
  export interface IRedisClientRecord {
    : never;
  }
}
```

Adjust the code, and then add `order`

``` diff
declare module 'vona-module-a-redis' {
  export interface IRedisClientRecord {
+   order: never;
  }
}
```

### 2. Adding Client Configuration

`src/backend/config/config/config.ts`

``` typescript
// redis
config.redis = {
  clients: {
    order: {
      keyPrefix: true,
      host: 'xx.xx.xx.xx',
      port: 6379,
      password: 'xxxxxx',
    },
  },
};
```

## Obtaining Redis Client Instance

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

## Using Redis Client

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

- For more usage, see: [ioredis](https://github.com/redis/node-redis)

## Distributed Components

To support distributed development, VonaJS provides the following core components based on `Redis`:

- `Broadcast`: Broadcasts can be emitted to multiple worker processes in the system, allowing each worker process to execute business logic
- `Queue`: Provides a powerful queue component based on [BullMQ](https://github.com/taskforcesh/bullmq)
- `Redlock`: Provides an intuitive and easy-to-use distributed lock based on [Redlock](https://github.com/sesamecare/redlock/)
- `Schedule`: Provides intuitive and easy-to-use schedule based on [BullMQ](https://github.com/taskforcesh/bullmq). Schedule is a special case of queue
- `Startup`: Allows initialization logic to be executed during system startup or instance initialization

See: [Distributed Components](../../distributed/introduction.md)
