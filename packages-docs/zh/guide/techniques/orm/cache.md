# 缓存

许多框架使用最简短的用例来证明是否高性能，而忽略了业务复杂性带来的性能挑战。随着业务的增长和变更，项目性能就会断崖式下降，各种优化补救方案让项目代码繁杂冗长。而 Vona 正视大型业务的复杂性，从框架核心引入缓存策略，并实现了`二级缓存`、`Query缓存`和`Entity缓存`等机制，轻松应对大型业务系统的开发，可以始终保持代码的优雅和直观

## 开箱即用

Vona ORM 提供了`开箱即用`的缓存机制，我们只需像常规一样操作 ORM，系统内部帮我们对缓存做了处理，并确保缓存数据的一致性

## Entity缓存

`Entity缓存`的规则：

|Key|Value|
|--|--|
|Entity Id|Entity Data|

#### 举例

``` typescript
class ServiceUser extends BeanBase {
  async getUser() {
    const user = await this.scope.model.user.get({ id: 1 });
    return user;
  }

  async updateUser() {
    await this.scope.model.user.update({ id: 1, name: 'Tom' });
  }

  async deleteUser() {
    await this.scope.model.user.delete({ id: 1 });
  }
}  
```

1. 当执行`user.get`方法时，系统自动创建缓存：`1 -> user`。如果已经存在缓存，则直接返回缓存
2. 当执行`user.update`方法时，系统自动删除缓存：`key：1`
3. 当执行`user.delete`方法时，系统自动删除缓存：`key：1`

## Query缓存

### 1. 普通查询

普通查询分两步：
1. 先查询出目标数据的`Id数组`
2. 再使用`Id数组`从`Entity缓存`中取得最终数据

因此，`普通查询`的`Query缓存`规则如下：

|Key|Value|
|--|--|
|Hash of query clause|Array of Id|

- 缓存 Key：为了节约缓存空间，并且提升缓存查询性能，系统将`查询语句`生成`Hash`，作为缓存 Key
- 缓存 Value：系统将查询出的目标数据的`Id数组`作为缓存 Value

#### 举例

``` typescript
class ServiceUser extends BeanBase {
  async findUsers() {
    const users = await this.scope.model.user.select({
      where: {
        age: { _gt_: 18 },
      },
    });
    return users;
  }
}
```

* 当执行`user.select`方法时，系统执行以下逻辑：
  1. 基于 where 计算出 Hash：`xxxxxx` 
  2. 通过 Hash：`xxxxxx`判断是否存在 Query 缓存
      - 如果存在，则直接取得`Id数组`
      - 如果不存在，则通过 where 查询出`Id数组`，并创建缓存
  3. 使用`Id数组`从`Entity缓存`中取得最终数据

### 2. 聚合与分组

`聚合与分组`只需一步，直接将查询结果写入缓存数据

因此，`聚合与分组`的`Query缓存`规则如下：

|Key|Value|
|--|--|
|Hash of query clause|Result|

#### 举例

``` typescript
class ServiceUser extends BeanBase {
  async userStats() {
    const userStats = await this.scope.model.user.aggregate({
      aggrs: {
        count: '*',
        sum: 'scores',
        max: 'age',
        min: 'age',
      },
      where: {
        scores: { _gt_: 30 },
      },
    });
    return userStats;
  }
}
```

* 当执行`user.aggregate`方法时，系统执行以下逻辑：
  1. 基于 where + aggrs 计算出 Hash：`xxxxxx` 
  2. 通过 Hash：`xxxxxx`判断是否存在 Query 缓存
      - 如果存在，则直接取得缓存作为最终数据
      - 如果不存在，则通过 where + aggrs 查询出最终数据，并创建缓存
