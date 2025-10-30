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
class ControllerStudent {
  @Web.get('login')
  @Passport.public()
  async login() {
    const jwt = await this.bean.auth.authenticate('a-authsimple:simple', {
      clientOptions: { username: 'admin', password:'123456' },
    });
    return jwt;
  }
}
```

* 简化方式：

``` typescript
class ControllerStudent {
  @Web.get('login')
  @Passport.public()
  async login() {
    const jwt = await this.bean.authSimple.authenticate(
      { username: 'admin', password:'123456' }
    );
    return jwt;
  }
}
```

* 举例：`Github`认证

``` typescript
class ControllerStudent {
  @Web.get('login')
  @Passport.public()
  async login() {
    await this.bean.auth.authenticate(
      'a-authgithub:github',
      { state: { redirect: '/' } },
    );
  }
}
```

## 设置第三方认证凭据

仍以`Github`为例，在 App Config 中设置认证凭据

`src/backend/config/config/config.ts`

``` typescript
// onions
config.onions = {
  authProvider: {
    'a-authgithub:github': {
      clients: {
        default: {
          clientID: 'xxxxxx',
          clientSecret: 'xxxxxxx',
        },
      },
    },
  },
};
```

- `clients.default`: 一个 Provider 可以设置多个 Clients，默认是`default`

### 如何添加更多Client凭据

首先采用接口合并机制添加 Client 类型定义

``` typescript
declare module 'vona-module-a-authgithub' {
  export interface IAuthProviderGithubClientRecord {
    another: never;
  }
}
```

然后在 App Config 中设置认证凭据

``` diff
// onions
config.onions = {
  authProvider: {
    'a-authgithub:github': {
      clients: {
        default: {
          clientID: 'xxxxxx',
          clientSecret: 'xxxxxxx',
        },
+       another: {
+         clientID: 'yyyyyy',
+         clientSecret: 'yyyyyyy',
+       },
      },
    },
  },
};
```

## bean.auth.authenticate

### 方法定义

``` typescript
async authenticate<T extends keyof IAuthProviderRecord>(
  authProviderName: T,
  options?: IAuthenticateOptions<IAuthProviderRecord[T]>,
): Promise<IJwtToken | undefined>{}
```

### 返回值

* 对于不需要 redirect 的认证方式，当认证成功后返回 jwt token
* 对于需要 redirect 的认证方式，当认证成功后直接转向 redirect

### 参数

|名称|说明|
|--|--|
|authProviderName|Provider名称|
|options.clientName|Client名称，缺省为`default`|
|options.clientOptions|Client选项，不同的Provider有各自不同的Options定义| 
|options.state|本次认证的状态值|

* options.clientOptions

对于第三方认证，有以下基本字段：

|名称|说明|
|--|--|
|clientID|凭证ID|
|clientSecret|凭证密钥|
|scope|授权范围|
|confirmed|用户是否为确认状态|

::: tip
`confirmed`: 一般而言，对于新用户，如果第三方认证返回了有效的 email，可以认为`confirmed=true`，从而不必执行后续的`用户激活`操作。根据业务的需求，可以灵活定制`confirmed`的判断规则
:::

* options.state

|名称|类型|说明|
|--|--|--|
|intention|'register' \| 'login' \| 'associate' \| 'migrate'|本次认证的意图，默认为`login`|
|redirect|string \| undefined|本次认证成功后需要转向的 URL|

::: tip
`redirect`: 第三方认证成功后会返回`code`值，该值会附加到 URL 地址的尾部，形如：`/?x-vona-oauth-code=xxxxxx`

前端取得`x-vona-oauth-code`值，再调用后端 api 换取`jwt token`
:::

## passport api

## callback
## meta.tip

