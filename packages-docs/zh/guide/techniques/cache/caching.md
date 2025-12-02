# Caching装饰器

使用装饰器为任何 Class 的任何 Method 提供缓存能力

在文档[Summer缓存(二级缓存)](./summer.md)中创建了一个 Summer Cache `demo-student:student`。下面演示如果通过 Caching 装饰器使用 Summer Cache

## 最简用法


``` diff
import { Caching } from 'vona-module-a-caching';

@Service()
class ServiceStudent {
+ @Caching.get({ cacheName: 'demo-student:student' })
  async findOne(id: TableIdentity): Promise<EntityStudent | undefined> {
    return await this.scope.model.student.getById(id);
  }
```

`@Caching.get`会自动使用 Summer Cache，伪代码如下:

``` typescript
const cacheKey='xxx';
const cacheValue = await this.scope.summerCache.student.get(cacheKey, {
  get: () => findOne(id),
});
```

系统会自动生成唯一的`cacheKey`

## 更多参数1

``` typescript
@Caching.get({
  cacheName: 'demo-student:student',
  ttl: 2 * 3600 * 1000,
  broadcastOnSet: 'del',
  updateAgeOnGet: true,
  ignoreNull: false,
  mode: 'all',
})
```

|名称|说明|
|名称|类型|说明|
|--|--|--|
|cacheName|string|缓存名|
|ttl|number|缓存的过期时间|
|broadcastOnSet|boolean \| 'del'|当设置缓存时，是否需要通过广播设置其他Workers的缓存。设置为`del`，那么就通过广播删除其他Workers的缓存|
|updateAgeOnGet|boolean|当读取缓存时是否更新ttl|
|ignoreNull|boolean|是否忽略`null`值|
|mode|'all' \| 'mem' \| 'redis'|缓存模式|

## 更多参数2

``` typescript
@Caching.get({
  cacheName: 'demo-student:student',
  enable: true,
  meta: {
    flavor: 'normal',
    mode: 'dev',
  },
})
```

|名称|类型|说明|
|--|--|--|
|enable|boolean|启用/禁用缓存|
|flavor|string\|string[]|参见: [运行环境与Flavor](../../env-config/mode-flavor/introduction.md)|
|mode|string\|string[]|参见: [运行环境与Flavor](../../env-config/mode-flavor/introduction.md)|

## 更多参数3

``` typescript
@Caching.get({
  cacheName: 'demo-student:student',
  cacheProp: 'student', // 'findOne'
  cacheKeyFn: 'customCacheKey',
})
```

|名称|类型|说明|
|--|--|--|
|cacheProp|string|自定义属性名，默认等于被装饰的方法名|
|cacheKeyFn|function|用于生成自定义的缓存Key|

## 自定义缓存Key

可以指定`cacheKeyFn`参数，用于生成自定义的缓存 Key

``` diff
import type { TypeCachingActionOptions } from 'vona-module-a-caching';
import { getKeyHash } from 'vona-module-a-cache';

class ServiceStudent {
+ customCacheKey(args: any[], prop: string, options: TypeCachingActionOptions) {
+   return `${this.$beanFullName}_${options.cacheProp ?? prop}_${getKeyHash(args[0])}`;
+ }

  @Caching.get({
    cacheName: 'demo-student:student',
+   cacheKeyFn: 'customCacheKey',
  })
  async findOne(id: TableIdentity): Promise<EntityStudent | undefined> {
    return await this.scope.model.student.getById(id);
  }
}  
```

如果`cacheKeyFn`返回如下值，则忽略缓存：`undefined/null/false/''`

`cacheKeyFn`返回值可以是任何类型，只要能确保 Cache Key 唯一即可，比如:

``` typescript
customCacheKey(args: any[]) {
  return args[0]; // id
}
```

## Caching装饰器清单

|名称|说明|
|--|--|
|@Caching.get|读取缓存|
|@Caching.set|设置缓存|
|@Caching.del|删除缓存|
|@Caching.clear|清理所有缓存|

## 完整范例

### 1. @Caching.get

``` diff

```




