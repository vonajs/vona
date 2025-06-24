# Config

Vona loads config files based on multi-dimensional variables, providing a more flexible configuration mechanism and supporting more complex business scenarios

## meta & config file

Vona loads config files from the `src/backend/config/config` directory. File loading based on `meta` conditions is also supported. For specific rules, see: [meta & .env file](../env/introduction.md)

### For example

Execute `npm run dev` on the command line, then the corresponding meta variable values are:

| Name    | Value         |
| ------- | ------------- |
| mode    | 'dev' |
| flavor  | 'normal'       |

The system will automatically load the configuration in the following files and merge them:

```txt
config.ts
config.normal.ts
config.normal.local.ts
config.mine.ts
config.normal.mine.ts
config.normal.local.mine.ts
```

## Use global config

The global config object can be obtained directly through `this.app.config` in any bean instance

```typescript{4}
@Service()
export class ServiceDatabase extends BeanBase {
  get configDatabase() {
    return this.app.config.database;
  }
}
```

## Use module config

Modules can individually provide their own `config` configuration, which can be obtained through the `Scope` instance. See: [Config](../../essentials/scope/config.md)

## Override module config

You can use `project-level` config to override `module-level` config, see: [Config](../../essentials/scope/config.md)

## The relationship between env and config

Some variables exist in both `env` and `config`. The basic logic is as follows:

1. Configure the value of the variable in `env`
2. Let the value in `config` equal the value in `env`
3. Prioritize using variable values through `config` in code
4. If you need to use the build-time tree shaking capability, use the value of the variable through `process.env.xxx`

### Variable comparison table

| Variables in env | Variables in config |
| ---------------- | ------------------- |
| process.env.META_MODE       | app.config.meta.mode         |
| process.env.META_FLAVOR     | app.config.meta.flavor       |