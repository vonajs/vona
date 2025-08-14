# 配置

## Config配置

我们可以在 App Config 中进行 ORM 配置：

`src/backend/config/config/config.ts`

``` typescript
// orm
config.database = {
  base: {},
  clients: {},
  defaultClient: 'pg',
};
```

|名称|说明|
|--|--|
|base|基础配置，为所有数据源提供通用的基础配置|
|clients|配置多个数据源|
|defaultClient|当前数据源，默认为`pg`|

* Config 配置的类型定义

``` typescript
export interface ConfigDatabase {
  defaultClient: TypeDefaultClientName;
  clients: Record<keyof IDatabaseClientRecord, ConfigDatabaseClient>;
  base: ConfigDatabaseClient;
}

export interface ConfigDatabaseClient extends Omit<Knex.Config, 'client'> {
  client: keyof IDatabaseClientDialectRecord;
}
```

* Vona ORM 底层使用的是[Knex](https://knexjs.org/)，因此，数据源的配置直接继承自 Knex.Config

其中`client`是数据库方言，Vona ORM 提供了类型化的定义方式。Vona ORM 当前提供了三个数据库方言：`pg`、`mysql`、`mysql2`，命名方式与 Knex 保持一致，参见：[Configuration Options](https://knexjs.org/guide/#configuration-options)


## 添加新数据源

为了开箱即用，系统内置了两个数据源：`pg`和`mysql`，配置如下：

`src/suite-vendor/a-vona/modules/a-orm/src/main.ts`

``` typescript
export async function configDefault(app: VonaApplication): Promise<PowerPartial<ConfigDatabase>> {
  return {
    defaultClient: app.meta.env.DATABASE_DEFAULT_CLIENT as keyof IDatabaseClientRecord,
    clients: {
      pg: {
        client: 'pg',
        connection: {
          host: app.meta.env.DATABASE_CLIENT_PG_HOST,
          port: Number.parseInt(app.meta.env.DATABASE_CLIENT_PG_PORT!),
          user: app.meta.env.DATABASE_CLIENT_PG_USER,
          password: app.meta.env.DATABASE_CLIENT_PG_PASSWORD,
          database: app.meta.env.DATABASE_CLIENT_PG_DATABASE,
        },
      },
      mysql: {
        client: 'mysql2',
        connection: {
          host: app.meta.env.DATABASE_CLIENT_MYSQL_HOST,
          port: Number.parseInt(app.meta.env.DATABASE_CLIENT_MYSQL_PORT!),
          user: app.meta.env.DATABASE_CLIENT_MYSQL_USER,
          password: app.meta.env.DATABASE_CLIENT_MYSQL_PASSWORD,
          database: app.meta.env.DATABASE_CLIENT_MYSQL_DATABASE,
        },
      },
    },
    base: {
      pool: { min: 0, max: 5 },
      acquireConnectionTimeout: 60000 * 10,
      asyncStackTraces: true,
    },
  };
}
```

* `clients.pg.client`：使用 Postgresql 方言`pg`
* `clients.mysql.client`：使用 Mysql 方言`mysql2`
* `base.pool`：通用的连接池配置

### 举例：

如果我们想为`生产环境`添加一个新的数据源，名称为`pgOrder`，使用数据库方言`pg`，那么，App Config 配置如下：

`src/backend/config/config/config.prod.ts`

``` typescript
// orm
config.database = {
  clients: {

  },
};
```



