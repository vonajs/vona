# 认证体系

模块`a-auth`提供了通用的认证体系，使用`Provider机制`支持各种认证方式

## 特性

* `Provider机制`：使用`Provider`支持各类认证方式，如：用户名/密码认证、第三方认证（Github），等等
* `Clients`：同一个 Provider 可以提供多个凭证
* `关联认证`：可以为同一个用户关联多个认证方式
* `迁移认证`：可以将一个用户的认证方式迁移到另一个用户

## bean.auth

模块`a-auth`提供了全局 Bean `bean.auth`，可以通过统一的方式使用所有 Provider 提供的认证能力

* 举例：`用户名/密码`认证

``` typescript
const jwt = await this.bean.auth.authenticate('a-authsimple:simple', {
  clientOptions: { username: 'admin', password:'123456' },
});
```

* 简化方式：

``` typescript
const jwt = await this.bean.authSimple.authenticate(
  { username: 'admin', password:'123456' }
);
```

* 举例：`Github`认证

``` typescript
await this.bean.auth.authenticate('');
```

## passport api

## callback
## meta.tip

