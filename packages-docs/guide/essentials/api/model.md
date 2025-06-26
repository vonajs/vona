# Model

## Create Model

For example, we create a Model: `student` in the module demo-student

### 1. Cli command

``` bash
$ vona :create:bean model student --module=demo-student
```

### 2. Menu command

::: tip
Context Menu - [Module Path]: `Vona Create/Model`
:::

## Model Definition

``` typescript
import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityStudent } from '../entity/student.ts';

@Model({ entity: EntityStudent })
export class ModelStudent extends BeanModelBase<EntityStudent> {}
```

- Inherit from `BeanModelBase` class
- Use `Model` decorator
- Set the corresponding `entity`

## Using Model

Using Model in Vona supports `dependency injection` and `dependency lookup`. It is recommended to use `dependency lookup` because it can make the code more concise and intuitive

### 1. Lookup in this module

``` typescript
class ServiceStudent {
  async findAll(): Promise<EntityStudent[]> {
    return await this.scope.model.student.select();
  }
}
```

### 2. Lookup Cross-module

``` typescript
class ServiceStudent {
  async findAll(): Promise<EntityStudent[]> {
    return await this.$scope.demoStudent.model.student.select();
  }
}
```

## CRUD

Here, we only introduce basic CRUD operations

### 1. Create

``` typescript
class ServiceStudent {
  async create(student: DtoStudentCreate): Promise<EntityStudent> {
    return await this.scope.model.student.insert(student);
  }
}
```

### 2. Read

```typescript
class ServiceStudent { 
  async findAll(): Promise<EntityStudent[]> { 
    return await this.scope.model.student.select(); 
  } 

  async findOne(id: TableIdentity): Promise<EntityStudent | undefined> { 
    return await this.scope.model.student.get({ id }); 
  }
}
```

- id: The type is `TableIdentity`, supporting two field types: `number` and `bignumber`

### 3. Update

```typescript
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

```typescript
class ServiceStudent { 
  async remove(id: TableIdentity) {
    return await this.scope.model.student.delete({ id });
  }
}
```

## Knex Query Builder

Vona Model is based on [knex](https://knexjs.org/). Therefore, it also supports the [Query Builder](https://knexjs.org/guide/query-builder.html) provided by knex

### 1. builder

Invoke the `builder` method of the model to obtain an instance of the knex query builder

``` typescript
class ServiceStudent {
  async findAll(): Promise<EntityStudent[]> {
    return await this.scope.model.student.builder().where('name', 'tom').orderBy('name');
  }
}
```

### 2. builderSelect

The `builderSelect` method also obtains an instance of the knex query builder. Unlike `builder`, `builderSelect` supports `soft deletion` and `multi-instance/multi-tenant`

``` typescript
class ServiceStudent {
  async findAll(): Promise<EntityStudent[]> {
    return await this.scope.model.student.builderSelect().where('name', 'tom').orderBy('name');
  }
}
```

## Model Options

|Name|Description|
|--|--|
|entity|Entity corresponding to model|
|table|Table name corresponding to model. If entity parameter is passed, the table name is automatically obtained from entity|
|disableDeleted|Whether to disable soft deletion, the default is false|
|disableInstance|Whether to disable multi-instance/multi-tenant, the default is false|
|clientName|Specify the data source name|
|cacheOptions|Configure cache parameters, enable redis-based cache by default|

## Soft deletion, multi-instance/multi-tenant

Model automatically enables soft deletion by default. When data deleting, it is not physically deleted, but the value of the field `deleted` is set to `true`

Model supports multi-instance/multi-tenant by default. When performing CRUD operations on data, the instance id is automatically obtained from the Request context and passed into the sql statement

For example, execute `model.student.select()`, then the generated sql is as follows:

``` bash
select "demoStudent"."id" from "demoStudent"
  where "demoStudent"."iid" = 1 and "demoStudent"."deleted" = false
```

- iid: instance Id
- deleted: soft deletion

### Temporarily disable soft deletion

We can also temporarily specify the `soft deletion` parameter when executing the model method

``` typescript
class ServiceStudent {
  async findAll(): Promise<EntityStudent[]> {
    return await this.scope.model.student.select({}, { disableDeleted: true });
  }
}
```
