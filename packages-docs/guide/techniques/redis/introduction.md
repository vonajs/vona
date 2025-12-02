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






