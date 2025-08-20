# 数据库事务

Vona ORM 对数据库事务提供了完整的支持

## 使用装饰器启用事务

``` typescript
class ServicePost {
  @Database.transaction()
  async transaction() {
    // insert
    const post = await this.scope.model.post.insert({
      title: 'Post001',
    });
    // update
    await this.scope.model.post.update({
      id: post.id,
      title: 'Post001-Update',
    });
  }
}  
```

## 手工启用事务

### 1. 使用当前数据源

``` typescript
const db = this.app.bean.database.current;
await db.transaction.begin(async () => {
  const scopeTest = this.app.bean.scope('test-vona');
  const modelPost = scopeTest.model.post;
  await modelPost.update({ id: 1, title: 'Post001_Update' });
});
```

### 2. 使用指定数据源

``` typescript
// get datasource by clientName
const db = app.bean.database.getDb({ clientName: 'default' });
await db.transaction.begin(async () => {
  const scopeTest = app.bean.scope('test-vona');
  const modelPost = scopeTest.model.post.newInstance(db);
  await modelPost.update({ id: 1, title: 'Post001_Update' });
});
```

## 事务参数

``` diff
class ServicePost {
  @Database.transaction({
+   isolationLevel: 'READ_COMMITTED',
+   propagation: 'REQUIRED'
  })
  async transaction() {
    ...
  }
}  
```

``` diff
const db = app.bean.database.getDb({ clientName: 'default' });
await db.transaction.begin(
  async () => {
  ...
  },
+ {
+   isolationLevel: 'READ_COMMITTED',
+   propagation: 'REQUIRED',
+ }
);
```

## 事务参数：isolationLevel

|名称|说明|
|--|--|
|DEFAULT|数据库提供的缺省配置|
|READ_UNCOMMITTED||
|READ_COMMITTED||
|REPEATABLE_READ||
|SERIALIZABLE||
|SNAPSHOT||


## 事务参数：propagation

Vona ORM 支持数据库事务传播机制

|名称|说明|
|--|--|
|REQUIRED|默认的事务传播级别。如果当前存在事务, 则加入该事务。如果当前没有事务, 则创建一个新的事务|
|SUPPORTS|如果当前存在事务，则加入该事务. 如果当前没有事务, 则以非事务的方式继续运行|
|MANDATORY|强制性。如果当前存在事务, 则加入该事务。如果当前没有事务，则抛出异常|
|REQUIRES_NEW|创建一个新的事务。如果当前存在事务, 则把当前事务挂起。也就是说不管外部方法是否开启事务，总是开启新的事务, 且开启的事务相互独立, 互不干扰|
|NOT_SUPPORTED|以非事务方式运行。如果当前存在事务，则把当前事务挂起(不用)|
|NEVER|以非事务方式运行。如果当前存在事务，则抛出异常|

