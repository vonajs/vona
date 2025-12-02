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
Context menu - [Module Path]: `Vona Bean/Cache Summer`
:::

## Summer Cache Definition

``` typescript
export type TCacheRedisStudentKey = string;
export interface TCacheRedisStudentData { id: string; name: string }

@CacheRedis({
  ttl: 2 * 3600 * 1000,
})
export class CacheRedisStudent
  extends BeanCacheRedisBase<TCacheRedisStudentKey, TCacheRedisStudentData> {}
```

- `TCacheRedisStudentKey`: Defines the type of the cache key
- `TCacheRedisStudentData`: Defines the type of the cache data

## Summer Cache Parameters

Parameters can be configured for Summer Cache

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

|Name|Type|Default|Description|
|--|--|--|--|
|ttl|number||Cache expiration time|
|updateAgeOnGet|boolean|true|Whether to update the ttl when reading from the cache|
|disableInstance|boolean|false|Whether to disable instance isolation. By default, caches between multiple instances are isolated|
|disableTransactionCompensate|boolean|false|Whether to disable transaction compensation. Enabling transaction compensation ensures cache data consistency|
|client|string|'cache'|Summer client used for caching|

## App Config

Summer Cache parameters can be configured in App Config

`src/backend/config/config/config.ts`

``` typescript
// onions
config.onions = {
  summerCache: {
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
@CacheRedis({
+ meta: {
+   flavor: 'normal',
+   mode: 'dev',
+ },
})
class CacheRedisStudent {}
```

## Using Summer Cache

``` typescript
class ControllerStudent {
  @Web.get('test')
  async test() {
    const student = { id: '1', name: 'tom' };
    await this.scope.summerCache.student.set(student, '1');
    const value = await this.scope.summerCache.student.get('1');
    assert.deepEqual(student, value);
  }
}  
```

- `this.scope.summerCache.student`: Gets the Summer Cache instance through the module scope

## Cache method parameters

Take the `set` method as an example to introduce the parameters of the cache method

``` typescript
await this.scope.summerCache.student.set(student, '1', {
  ttl: 2 * 3600 * 1000,
  disableTransactionCompensate: true,
  db: this.ctx.db,
});
```

|Name|Type|Description|
|--|--|--|
|ttl|number|cache expiration time|
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
