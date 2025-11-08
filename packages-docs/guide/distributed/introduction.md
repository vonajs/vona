# Distributed Components

To support distributed development, VonaJS provides the following core components based on `Redis`:

- `Broadcast`: Allows broadcasts to multiple worker processes in the system, enabling each worker to execute business logic
- `Queue`: Provides a powerful queue component based on [BullMQ](https://github.com/taskforcesh/bullmq)
- `Redlock`: Provides an intuitive and easy-to-use distributed lock based on [Redlock](https://github.com/sesamecare/redlock/)
- `Schedule`: Provides intuitive and easy-to-use scheduled tasks based on [BullMQ](https://github.com/taskforcesh/bullmq). Schedule is a special case of queue
- `Startup`: Allows initialization logic to be executed during system startup or instance initialization

## Redis Configuration

These distributed components use the same Redis Client by default, which can be configured in the `.env` file:

`env/.env`

```typescript
#redis

REDIS_DEFAULT_HOST = 127.0.0.1
REDIS_DEFAULT_PORT = 6379
REDIS_DEFAULT_PASSWORD =
REDIS_DEFAULT_DB = 0
```

## Independent configuration

For large projects, independent configurations can be provided for different components

`src/backend/config/config/config.ts`

```typescript
//redis
config.redis = { 
clients: { 
// broadcast 
broadcast: { 
host: 'host1', 
}, 
//queue/Schedule 
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