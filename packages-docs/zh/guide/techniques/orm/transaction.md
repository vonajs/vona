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
const db = app.bean.database.current;
await db.transaction.begin(async () => {
  const scopeTest = app.bean.scope('test-vona');
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

