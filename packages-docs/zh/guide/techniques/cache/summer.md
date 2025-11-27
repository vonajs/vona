# Summer缓存(二级缓存)

`Summer缓存`基于 Mem 缓存和 Redis 缓存实现

## 创建Summer缓存

比如，在模块 demo-student 中创建一个 Summer 缓存: `student`，用于缓存学生数据

### 1. Cli命令

``` bash
$ vona :create:bean summerCache student --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Bean/Summer Cache`
:::

## Summer缓存定义

``` typescript
export type TSummerCacheStudentKey = string;
export interface TSummerCacheStudentData { id: string; name: string }

@SummerCache()
export class SummerCacheStudent
  extends BeanSummerCacheBase<TSummerCacheStudentKey, TSummerCacheStudentData>
  implements ISummerCacheGet<TSummerCacheStudentKey, TSummerCacheStudentData> {
  async getNative(
    key?: TSummerCacheStudentKey,
    _options?: TSummerCacheActionOptions<TSummerCacheStudentKey, TSummerCacheStudentData>,
  ): Promise<TSummerCacheStudentData | null | undefined> {
    const student = await this.scope.model.student.getById(key!);
    if (!student) return null;
    return { id: student.id as string, name: student.name };
  }
}
```

- `TSummerCacheStudentKey`: 定义缓存 Key 的类型
- `TSummerCacheStudentData`: 定义缓存 Data 的类型

## getNative

读取 Summer 缓存的一般流程：

1. 先读取 Mem 缓存
2. 如果 Mem 缓存不存在，则读取 Redis 缓存
3. 如果 Redis 缓存不存在，则调用`getNative`方法
   - 比如，在`getNative`方法中查询 db 数据

## mgetNative

可以提供`mgetNative`方法支持同时读取多个缓存

如果没有提供`mgetNative`方法，在同时读取多个缓存时，系统会自动循环调用`mgetNative`方法

``` diff
export class SummerCacheStudent
  extends BeanSummerCacheBase<TSummerCacheStudentKey, TSummerCacheStudentData>
  implements
    ISummerCacheGet<TSummerCacheStudentKey, TSummerCacheStudentData>,
+   ISummerCacheMGet<TSummerCacheStudentKey, TSummerCacheStudentData> {
  async getNative(
    key?: TSummerCacheStudentKey,
    _options?: TSummerCacheActionOptions<TSummerCacheStudentKey, TSummerCacheStudentData>,
  ): Promise<TSummerCacheStudentData | null | undefined> {
    ...
  }

+ async mgetNative(
+   keys: TSummerCacheStudentKey[],
+   _options?: TSummerCacheActionOptions<TSummerCacheStudentKey, TSummerCacheStudentData>,
+ ): Promise<Array<TSummerCacheStudentData | null | undefined>> {
+   const students = await this.scope.model.student.mget(keys);
+   return students.map(student => {
+     return { id: student.id as string, name: student.name };
+   });
+ }
}
```

## Summer缓存参数

可以为 Summer 缓存配置参数

``` typescript
@CacheRedis({
  ttl: 2 * 3600 * 1000,
  updateAgeOnGet: true,
  disableInstance: false,
  disableTransactionCompensate: false,
  client: 'cache',
})
class CacheRedisStudent {}
```

|名称|类型|默认值|说明|
|--|--|--|--|
|ttl|number||缓存的过期时间|
|updateAgeOnGet|boolean|true|当读取缓存时是否更新ttl|
|disableInstance|boolean|false|是否禁用实例隔离。在默认情况下，多实例之间的缓存是隔离的|
|disableTransactionCompensate|boolean|false|是否禁止事务补偿。启用事务补偿可以确保缓存数据一致性|
|client|string|'cache'|缓存所使用的Redis Client|

## App Config配置

可以在 App Config 中配置 Summer 缓存参数

`src/backend/config/config/config.ts`

``` typescript
// onions
config.onions = {
  cacheRedis: {
    'demo-student:student': {
      ttl: 2 * 3600 * 1000,
      updateAgeOnGet: true,
      disableInstance: false,
      disableTransactionCompensate: false,
      client: 'cache',
    },
  },
};
```

## Summer缓存启用/禁用

可以控制 Summer 缓存的`启用/禁用`

### 1. Enable

`src/backend/config/config/config.ts`

``` diff
// onions
config.onions = {
  cacheRedis: {
    'demo-student:student': {
+     enable: true,
    },
  },
};
```

### 2. Meta

可以让 Summer 缓存在指定的运行环境生效

|名称|类型|说明|
|--|--|--|
|flavor|string\|string[]|参见: [运行环境与Flavor](../../env-config/mode-flavor/introduction.md)|
|mode|string\|string[]|参见: [运行环境与Flavor](../../env-config/mode-flavor/introduction.md)|

* 举例

``` diff
@CacheRedis({
+ meta: {
+   flavor: 'normal',
+   mode: 'dev',
+ },
})
class CacheRedisStudent {}
```

## 使用Summer缓存

``` typescript
class ControllerStudent {
  @Web.get('test')
  async test() {
    const student = { id: '1', name: 'tom' };
    await this.scope.cacheRedis.student.set(student, '1');
    const value = await this.scope.cacheRedis.student.get('1');
    assert.deepEqual(student, value);
  }
}  
```

- `this.scope.cacheRedis.student`: 通过模块 scope 取得缓存实例

## 缓存方法参数

以`set方法`为例介绍缓存方法的参数

``` typescript
await this.scope.cacheRedis.student.set(student, '1', {
  ttl: 2 * 3600 * 1000,
  disableTransactionCompensate: true,
  db: this.ctx.db,
});
```

|名称|类型|说明|
|--|--|--|
|ttl|number|缓存的过期时间|
|disableTransactionCompensate|boolean|是否禁止事务补偿|
|db|ServiceDb|在进行事务补偿时，会用到此db对象。在默认情况下，自动使用上下文中的db对象|

- `db`: VonaJS 支持多数据库/多数据源，因此可以通过`db`精确控制事务补偿能力

## 缓存方法清单

|名称|说明|
|--|--|
|get|读取缓存|
|mget|同时读取多个缓存|
|peek|拣取缓存，不更新缓存的ttl|
|set|设置缓存|
|mset|同时设置多个缓存|
|getset|设置新缓存，并返回旧值|
|has|判断缓存是否存在|
|del|删除缓存|
|mdel|同时删除多个缓存|
|clear|清理所有缓存|
|expire|修改缓存的过期时间|
|lookupKeys|获取所有缓存键|
