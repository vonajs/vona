# Model

## 创建Model

比如，我们在模块 demo-student 中创建一个 Model: `student`

### 1. Cli命令

``` bash
$ vona :create:bean model student --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Create/Model`
:::

## Model定义

``` typescript
import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityStudent } from '../entity/student.ts';

@Model({ entity: EntityStudent })
export class ModelStudent extends BeanModelBase<EntityStudent> {}
```

- 继承自 BeanModelBase 基类
- 使用 Model 装饰器
- 设置对应的 entity

## 使用Model

在 Vona 中使用 Model，支持`依赖注入`和`依赖查找`。推荐使用依赖查找，因为依赖查找可以让代码更加简洁、直观

### 1. 本模块查找

``` typescript
class ServiceStudent {
  async findAll(): Promise<EntityStudent[]> {
    return await this.scope.model.student.select();
  }
}
```

### 2. 跨模块查找

``` typescript
class ServiceStudent {
  async findAll(): Promise<EntityStudent[]> {
    return await this.$scope.demoStudent.model.student.select();
  }
}
```

## CRUD

在这里，我们仅介绍基本的 CRUD 操作

### 1. Create

``` typescript
class ServiceStudent {
  async create(student: DtoStudentCreate): Promise<EntityStudent> {
    return await this.scope.model.student.insert(student);
  }
}
```

### 2. Read

``` typescript
class ServiceStudent {
  async findAll(): Promise<EntityStudent[]> {
    return await this.scope.model.student.select();
  }
  
  async findOne(id: TableIdentity): Promise<EntityStudent | undefined> {
    return await this.scope.model.student.get({ id });
  }
}
```

- id: 类型为`TableIdentity`，支持`number`和`bignumber`两种字段类型

### 3. Update

``` typescript
class ServiceStudent {
  async update(id: TableIdentity, student: DtoStudentUpdate) {
    return await this.scope.model.student.update({
      ...student,
      id,
    });
  }
}
```

### 4. Delete

``` typescript
class ServiceStudent {
  async remove(id: TableIdentity) {
    return await this.scope.model.student.delete({ id });
  }
}
```

## Knex Query Builder

Vona Model 底层使用的是[knex](https://knexjs.org/)。因此，也支持 knex 提供的[Query Builder](https://knexjs.org/guide/query-builder.html)

### 1. builder

调用 model 的 builder 方法获取 knex query builder 的实例

``` typescript
class ServiceStudent {
  async findAll(): Promise<EntityStudent[]> {
    return await this.scope.model.student.builder().where('name', 'tom').orderBy('name');
  }
}
```

### 2. builderSelect

builderSelect 方法也是获取 knex query builder 的实例，与 builder 不同的是，builderSelect 支持`软删除`和`多实例/多租户`

``` typescript
class ServiceStudent {
  async findAll(): Promise<EntityStudent[]> {
    return await this.scope.model.student.builderSelect().where('name', 'tom').orderBy('name');
  }
}
```

## Model Options

|名称|说明|
|--|--|
|entity|model对应的entity|
|table|model对应的表名，如果传入了entity参数，那么自动从entity获取表名|
|disableDeleted|是否禁用软删除，默认为false|
|disableInstance|是否禁用多实例/多租户，默认为false|
|clientName|指定数据源名称|
|cacheOptions|配置缓存参数，默认启用基于redis的缓存|

## App config配置

可以在 App config 中配置 Model options

`src/backend/config/config/config.dev.ts`

``` typescript
// onions
config.onions = {
  model: {
    'demo-student:student': {
      disableDeleted: true,   // 禁用软删除
      disableInstance: true,  // 禁用多实例/多租户
      cacheOptions: false,    // 禁用缓存
      clientName: 'mysql',    // 使用数据源：mysql
    },
  },
};
```

## 软删除, 多实例/多租户

Model 默认自动启用软删除，当删除一条数据时，并不进行物理删除，而是设置字段 deleted 的值为 true

Model 默认支持多实例/多租户。对数据进行 CRUD 操作时，自动从 Request 上下文获取实例 Id，并传入 sql 语句中

比如，执行`model.student.select()`，那么生成的 sql 如下：

``` bash
select "demoStudent"."id" from "demoStudent" 
  where "demoStudent"."iid" = 1 and "demoStudent"."deleted" = false
```

- iid：实例 Id
- deleted：软删除

### 临时禁用软删除

我们也可以在执行 model 方法时临时指定`软删除`参数

``` typescript
class ServiceStudent {
  async findAll(): Promise<EntityStudent[]> {
    return await this.scope.model.student.select({}, { disableDeleted: true });
  }
}
```

## 数据源

Vona 支持多数据库、多数据源。可以针对任何一个数据源调用 Model 的方法

### 1. 默认数据源

在默认情况下，Model 使用的是系统设置的缺省数据源

`env/.env`

``` bash
DATABASE_DEFAULT_CLIENT = 'pg' # pg/mysql
```

### 2. 静态数据源

* 在 Model options 中指定数据源

``` typescript{1}
@Model({ clientName: 'mysql' })
class ModelBook {}
```

* 在 App config 中指定数据源

`src/backend/config/config/config.dev.ts`

``` typescript
// onions
config.onions = {
  model: {
    'demo-student:student': {
      clientName: 'mysql',    // 使用数据源：mysql
    },
  },
};
```

### 3. 动态数据源

我们还可以在代码中动态指定数据源

``` typescript
class ServiceStudent {
  async findAll(): Promise<EntityStudent[]> {
    const modelMysql = this.scope.model.student.newInstance('mysql');
    return await modelMysql.select();
  }
}
```

## 缓存

Vona Model 默认启用了缓存，从而使系统在默认情况下就具备非常高的性能。我们还可以设置缓存配置

### 1. 禁用缓存

``` typescript
@Model({ cacheOptions: false })
class ModelStudent {}
```

### 2. 在 Model options 中配置缓存

``` typescript
@Model({ cacheOptions: {
  mode: 'all', // all/mem/redis
  mem: {
    max: 500,
    ttl: 5 * 1000, // 5s
  },
  redis: {
    ttl: 5 * 1000, // 5s
  },
} })
class ModelStudent {}
```

- mode：缓存模式，支持`二级缓存`/`mem缓存`/`redis缓存`。默认使用的是`redis缓存`
- mem：`mem缓存`配置
- redis：`redis缓存`配置

### 3. 在 App config 中配置缓存

`src/backend/config/config/config.dev.ts`

``` typescript
// onions
config.onions = {
  model: {
    'demo-student:student': {
      cacheOptions: {
        mode: 'all', // all/mem/redis
        mem: {
          max: 500,
          ttl: 5 * 1000, // 5s
        },
        redis: {
          ttl: 5 * 1000, // 5s
        },
      }
    },
  },
};
```
