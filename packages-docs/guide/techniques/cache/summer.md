# Summer Cache (Two-Layer Cache)

`Summer Cache` is implemented based on Mem Cache and Redis Cache

## Create Summer Cache

For example, create a Summer Cache `student` in the module `demo-student`, to cache student data

### 1. Cli Command

``` bash
$ vona :create:bean summerCache student --module=demo-student
```

### 2. Menu Command

::: tip
Context menu - [Module Path]: `Vona Bean/Summer Cache`
:::

## Summer Cache Definition

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

- `TSummerCacheStudentKey`: Defines the type of the cache key
- `TSummerCacheStudentData`: Defines the type of the cache data

## getNative

General process for reading Summer cache:

1. First, read the Mem cache
2. If the Mem cache does not exist, read the Redis cache
3. If the Redis cache does not exist, call the `getNative` method
  - For example, query the database data in the `getNative` method

## mgetNative

The `mgetNative` method can be provided to support reading multiple caches simultaneously

If the `mgetNative` method is not provided, the system will automatically loop through and call the `getNative` method when reading multiple caches at the same time

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

## Summer Cache Parameters

Parameters can be configured for Summer Cache

``` typescript
@SummerCache({
  preset: 'all',
  mode: 'all',
  mem: {
    max: 500,
    ttl: 2 * 3600 * 1000,
  },
  redis: {
    ttl: 2 * 3600 * 1000,
  },
  ignoreNull: false,
})
class SummerCacheStudent {}
```

|Name|Type|Default|Description|
|--|--|--|--|
|preset|'all' \| 'mem' \| 'redis'||Predefined configuration is a combination of `mode/mem/redis` parameters|
|mode|'all' \| 'mem' \| 'redis'|'all'|Cache mode|
|mem|||Mem cache configuration|
|redis|||Redis cache configuration|
|ignoreNull|boolean|false|Whether to ignore `null` values. When `ignoreNull=true`, if the data read from Memcache/Redis cache is `null`, it will be ignored, and then the `getNative/mgetNative` method will be called to obtain a new value|

* mode

|Name|Description|
|--|--|
|all|Use both Mem cache and Redis cache|
|mem|Use only Mem cache|
|redis|Use only Redis cache|

## App Config

Summer Cache parameters can be configured in App Config

`src/backend/config/config/config.ts`

``` typescript
// onions
config.onions = {
  summerCache: {
    'demo-student:student': {
      preset: 'all',
      mode: 'all',
      mem: {
        max: 500,
        ttl: 2 * 3600 * 1000,
      },
      redis: {
        ttl: 2 * 3600 * 1000,
      },
      ignoreNull: false,
    },
  },
};
```

## Summer Cache Enable/Disable

You can control `enable/disable` of Summer Cache

### 1. Enable

`src/backend/config/config/config.ts`

``` diff
// onions
config.onions = {
  summerCache: {
    'demo-student:student': {
+     enable: true,
    },
  },
};
```

### 2. Meta

Allows Summer Cache to take effect in a specified operating environment

|Name|Type|Description|
|--|--|--|
|flavor|string\|string[]|See: [Runtime Environments and Flavors](../../env-config/mode-flavor/introduction.md)|
|mode|string\|string[]|See: [Runtime Environments and Flavors](../../env-config/mode-flavor/introduction.md)|

* Example

``` diff
@SummerCache({
+ meta: {
+   flavor: 'normal',
+   mode: 'dev',
+ },
})
class SummerCacheStudent {}
```

## Using Summer Cache

``` typescript
class ControllerStudent {
  @Web.get('test')
  async test() {
    const studentByDb = await this.scope.model.student.getById('2');
    const studentBySummer = await this.scope.summerCache.student.get('2');
    assert.equal(studentByDb?.id, studentBySummer?.id);
    assert.equal(studentByDb?.name, studentBySummer?.name);
  }
}  
```

- `this.scope.summerCache.student`: Gets the Summer Cache instance through the module scope

## Cache method parameters

Take the `get` method as an example to introduce the parameters of the cache method

``` typescript
await this.scope.summerCache.student.get('2', {
  ttl: 2 * 3600 * 1000,
  broadcastOnSet: 'del',
  updateAgeOnGet: true,
  ignoreNull: false,
  mode: 'all',
  force: false,
  disableTransactionCompensate: false,
  db: this.ctx.db,
  enable: true,
  get: async (_key?: string) => { return null; },
  mget: async (_keys: string[]) => { return []; },
});
```

|名称|类型|说明|
|--|--|--|
|ttl|number|Cache expiration time|
|broadcastOnSet|boolean \| 'del'|当设置缓存时，是否需要通过广播设置其他Workers的缓存。设置为`del`，那么就通过广播删除其他Workers的缓存|
|updateAgeOnGet|boolean|当读取缓存时是否更新ttl|
|ignoreNull|boolean|是否忽略`null`值|
|mode|'all' \| 'mem' \| 'redis'|缓存模式|
|force|boolean|强制读取新值|
|disableTransactionCompensate|boolean|是否禁止事务补偿|
|db|ServiceDb|在进行事务补偿时，会用到此db对象。在默认情况下，自动使用上下文中的db对象|
|enable|boolean|是否禁用Summer缓存|
|get|Function|覆盖`getNative`方法|
|mget|Function|覆盖`mgetNative`方法|

|Name|Type|Description|
|--|--|--|
|ttl|number|Cache expiration time|
|disableTransactionCompensate|boolean|Whether to disable transaction compensation|
|db| ServiceDb| This db object is used when performing transaction compensation. By default, the db object in the context is automatically used|

- `db`: VonaJS supports multiple databases/datasources, so transaction compensation can be precisely controlled through `db`

## Cache methods

|Name|Description|
|--|--|
|get|Read cache|
|mget|Read multiple caches at once|
|peek|Retrieve cache without updating its TTL|
|set|Set cache|
|mset|Set multiple caches at once|
|getset|Set new cache and return old value|
|has|Check if cache exists|
|del|Delete cache|
|mdel|Delete multiple caches at once|
|clear|Clear all caches|
|expire|Modify cache expiration time|
|lookupKeys|Get all cache keys|
