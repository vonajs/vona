# 内置守卫

## 局部守卫

|名称|说明|
|--|--|
|a-user:userName|判断当前用户名|
|a-user:roleName|判断当前用户的角色名|

## 全局守卫

|名称|说明|
|--|--|
|a-user:passport|初始化当前用户信息，并做基本判断|

## 是否允许匿名用户访问API

在默认情况下，只有登录用户才能访问 API。如果要允许匿名用户访问 API，代码如下：

* 一般用法：

``` typescript
import { Aspect } from 'vona-module-a-aspect';

@Aspect.guardGlobal('a-user:passport', { public: true })
```

* 简写方式：

``` typescript
import { Passport } from 'vona-module-a-user';

@Passport.public()
```

* 简写原理：

`@Passport.public`内部仍然调用的是`@Aspect.guardGlobal`，代码如下：

``` typescript
function Public(_public: boolean = true): ClassDecorator & MethodDecorator {
  return Aspect.guardGlobal('a-user:passport', { public: _public });
}
```

## 是否允许非激活用户访问API

在默认情况下，只有激活用户才能访问 API。如果要允许非激活用户访问 API，代码如下：

* 一般用法：

``` typescript
import { Aspect } from 'vona-module-a-aspect';

@Aspect.guardGlobal('a-user:passport', { activated: false })
```

* 简写方式：

``` typescript
import { Passport } from 'vona-module-a-user';

@Passport.activated(false)
```

## 判断当前用户名

* 一般用法：

``` typescript
import { Aspect } from 'vona-module-a-aspect';

@Aspect.guard('a-user:userName', { name: 'admin' })
```

* 简写方式：

``` typescript
import { Passport } from 'vona-module-a-user';

@Passport.userName({ name: 'admin' })
```

## 判断当前用户的角色名

* 一般用法：

``` typescript
import { Aspect } from 'vona-module-a-aspect';

@Aspect.guard('a-user:roleName', { name: 'admin' })
```

* 简写方式 1：

``` typescript
import { Passport } from 'vona-module-a-user';

@Passport.roleName({ name: 'admin' })
```

* 简写方式 2：

由于判断角色名是否为`admin`使用频率较高，因此又进一步提供了一个简写方式，如下：

``` typescript
import { Passport } from 'vona-module-a-user';

@Passport.admin()
```

## 组合使用

比如，我们同时使用局部守卫`a-user:userName`和`a-user:roleName`。判断规则如下：

- 先判断用户名，如果是`admin`则完成判断
- 如果用户名不等于`admin`，不抛出异常，而是继续执行后续的局部守卫
- 再判断角色名，如果是`admin`则完成判断
- 如果角色名不等于`admin`，则抛出异常

``` typescript
@Passport.userName({ name: 'admin', rejectWhenDismatched: false })
@Passport.roleName({ name: 'admin' })
```

|名称|说明|
|--|--|
|rejectWhenDismatched|当不匹配时是否要抛出异常，默认为`true`|
|passWhenMatched|当匹配时是否要完成判断，默认为`true`|