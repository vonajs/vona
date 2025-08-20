# Database Transaction

Vona ORM provides complete support for database transaction

## Enabling Transaction Using Decorator

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

## Manually Enabling Transaction

### 1. Using the current datasource

``` typescript
const db = this.app.bean.database.current;
await db.transaction.begin(async () => {
  const scopeTest = this.app.bean.scope('test-vona');
  const modelPost = scopeTest.model.post;
  await modelPost.update({ id: 1, title: 'Post001_Update' });
});
```

### 2. Using the specified datasource

``` typescript
// get datasource by clientName
const db = this.app.bean.database.getDb({ clientName: 'default' });
await db.transaction.begin(async () => {
  const scopeTest = this.app.bean.scope('test-vona');
  const modelPost = scopeTest.model.post.newInstance(db);
  await modelPost.update({ id: 1, title: 'Post001_Update' });
});
```

## Transaction parameters

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
const db = this.app.bean.database.getDb({ clientName: 'default' });
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

## Transaction Parameter: isolationLevel

|Name|Description|
|--|--|
|DEFAULT|Default configuration provided by the database|
|READ_UNCOMMITTED||
|READ_COMMITTED||
|REPEATABLE_READ||
|SERIALIZABLE||
|SNAPSHOT||

## Transaction Parameter: propagation

Vona ORM supports database transaction propagation mechanism

|Name|Description|
|--|--|
|REQUIRED|Default transaction propagation level. If a transaction currently exists, join it. If no transaction currently exists, create a new one
|SUPPORTS|If a transaction currently exists, join it. If no transaction currently exists, continue in non-transactional mode
|MANDATORY|Mandatory. If a transaction currently exists, join it. If no transaction currently exists, throw an exception
|REQUIRES_NEW|Creates a new transaction. If a transaction currently exists, suspends the current one. This means that regardless of whether the external method starts a transaction, a new transaction is always started, and the opened transaction is independent and do not interfere with each other
|NOT_SUPPORTED|Runs in non-transactional mode. If a transaction currently exists, suspends the current one (does not use it)
|NEVER|Runs in non-transactional mode. If a transaction is currently active, an exception is thrown

## Transaction Compensation Mechanism

Execute some logic when a transaction succeeds or fails

### 1. Success Compensation

``` typescript
this.app.bean.database.current.commit(async () => {
  // do something when success
});
```

### 2. Failure Compensation

``` typescript
this.app.bean.database.current.compensate(async () => {
  // do something when failed
});
```

## Transaction and Cache Data Consistency

Many frameworks use the simplest use cases to demonstrate high performance, ignoring the performance challenges brought about by business complexity. As the business grows and changes, project performance plummets, and various optimization solutions make the project code complex and lengthy. Vona addresses the complexity of large-scale businesses and incorporates caching strategies into its core framework. It implements mechanisms such as two-layer cache, query cache, and entity cache, making it easy to develop large-scale business systems while maintaining elegant and intuitive code

The Vona system adapts to database transaction and caching. When a database transaction fails, it automatically performs cache compensation operations, ensuring that database and cache data remain consistent

For this scenario, Vona provides a built-in solution

``` typescript
class ServicePost {
  @Database.transaction()
  async transaction() {
    // insert
    const post = await this.scope.model.post.insert({
      title: 'Post001',
    });
    // cache
    await this.bean.cache.redis('cache').set(post, 'Post001');
  }
}  
```

- When new data is created, it is cached in Redis. If an exception occurs in this transaction, the data will be rolled back, and the cached data will also be rolled back, ensuring that the database data is consistent with the cached data

``` typescript
const db = this.app.bean.database.getDb({ clientName: 'default' });
await db.transaction.begin(async () => {
  const scopeTest = this.app.bean.scope('test-vona');
  const modelPost = scopeTest.model.post.newInstance(db);
  const post = await modelPost.insert({ title: 'Post001' });
  await this.bean.cache.redis('cache').set(post, 'Post001', { db });
});
```

- If operations are performed on a specific database, the database object must be passed to the cache, allowing the cache to perform compensation operations for the specified database. When the database transaction is rolled back, the database data is kept consistent with the cached data