# ORM Config

## App Config Configuration

We can configure the ORM in App Config:

`src/backend/config/config/config.ts`

``` typescript
// orm
config.database = {
  base: {},
  clients: {},
  defaultClient: 'pg',
};
```

|Name|Description|
|--|--|
|base|Base configuration, provides common base configuration for all datasources|
|clients|Configure multiple datasources|
|defaultClient|Default datasource, defaults to `pg`|

* Config configuration type definition

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

* Vona ORM uses [Knex](https://knexjs.org/) under the hood, so the datasource configuration inherits directly from Knex.Config

Here, `client` is the database dialect, and Vona ORM provides a typed definition. Vona ORM currently provides three database dialects: `pg`, `mysql`, and `mysql2`. The naming convention is consistent with Knex. See: [Configuration Options](https://knexjs.org/guide/#configuration-options)

## Built-in Datasources

For out-of-the-box usage, two datasources are built-in: `pg` and `mysql`. The configuration is as follows:

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

* `clients.pg.client`: Uses the Postgresql dialect `pg`
* `clients.mysql.client`: Uses the MySQL dialect `mysql2`
* `base.pool`: General connection pool configuration

For ease of configuration, built-in datasources obtain configuration parameters from environment variables. Therefore, for built-in datasources, we can directly provide configuration information through env

`env/.env`

``` typescript
# database

DATABASE_DEFAULT_CLIENT = 'pg' # pg/mysql

DATABASE_CLIENT_PG_HOST = 127.0.0.1
DATABASE_CLIENT_PG_PORT = 5432
DATABASE_CLIENT_PG_USER = postgres
DATABASE_CLIENT_PG_PASSWORD = 
DATABASE_CLIENT_PG_DATABASE = postgres

DATABASE_CLIENT_MYSQL_HOST = 127.0.0.1
DATABASE_CLIENT_MYSQL_PORT = 3306
DATABASE_CLIENT_MYSQL_USER = root
DATABASE_CLIENT_MYSQL_PASSWORD = 
DATABASE_CLIENT_MYSQL_DATABASE = mysql
```

## Add a New Datasource

If we want to add a new datasource for the production environment, named `pgOrder`, using the database dialect `pg`, we can do the following:

### 1. Add Type Definitions

Add type definitions for the new datasource

``` typescript
declare module 'vona-module-a-orm' {
  export interface IDatabaseClientRecord {
    pgOrder: never;
  }
}
```

### 2. App Config Configuration:

`src/backend/config/config/config.prod.ts`

``` typescript
// orm
config.database = {
  clients: {
    pgOrder: {
      client: 'pg',
      connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: '',
        database: 'postgres',
      },
    },
  },
};
```

## How to Use Datasource

### 1. Obtaining a Specified Datasource

``` typescript
const pg = app.bean.database.getDb('pg');
const mysql = app.bean.database.getDb('mysql');
const pgOrder = app.bean.database.getDb('pgOrder');
```

### 2. Obtaining the Default Datasource

The default datasource is determined by the `defaultClient` configuration option

``` typescript
const dbDefault = app.bean.database.getDb('default');
```

### 3. Obtaining the Knex Instance Corresponding to the Datasource

The system creates different Knex instances for different datasources. Use these Knex instances to operate the database

``` typescript
const pg = app.bean.database.getDb('pg');
const items = pg.connection.select('*').from('tableName');

const dbDefault = app.bean.database.getDb('default');
const items = dbDefault.connection.select('*').from('tableName');
```

### 4. Obtaining the Current Datasource

In real-world code, we might use any datasource. We can use the following code to get the current datasource in the context:

``` typescript
const current = app.bean.database.current;
const items = current.connection.select('*').from('tableName');
```

## Advanced Customization of the Default Datasource

Let's first look at the type definition for the default datasource:

``` typescript
export type TypeDefaultClientNameFn = (ctx: VonaContext) => keyof IDatabaseClientRecord;

export type TypeDefaultClientName = TypeDefaultClientNameFn | keyof IDatabaseClientRecord;

export interface ConfigDatabase {
defaultClient: TypeDefaultClientName;
...
}
```

As you can see, `defaultClient` can also be passed a custom function. We can use this custom function to determine which datasource to use based on the request context:

`src/backend/config/config/config.prod.ts`

``` typescript
// orm
config.database = {
  defaultClient: (ctx: VonaContext) => {
    if (ctx.headers.xxx === 'yyy') return 'pg';
    return 'mysql';
  },
};
```
