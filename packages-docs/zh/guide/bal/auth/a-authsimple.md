## `用户名/密码`认证

模块`a-authsimple`提供了开箱即用的`用户名/密码`认证

## 如何使用

### 1. 注册新用户

``` typescript
const jwt = await this.bean.auth.authenticate('a-authsimple:simple', {
  clientOptions: {
    username: 'tom',
    password: '123456',
    email: 'xxx@xxx.com',
    avatar: ':emoji:flower',
    confirmed: true,
  },
  state: {
    intention: 'register',
  },
});
```

`confirmed`: 如果为`true`，意味着用户已经确认，不需要后续的`激活`操作

* 简写方式：

``` typescript
const jwt = await this.bean.authSimple.authenticate({
  username: 'tom',
  password: '123456',
  email: 'xxx@xxx.com',
  avatar: ':emoji:flower',
  confirmed: true,
}, 'register');
```

### 2. 登录

``` typescript
const jwt = await this.bean.auth.authenticate('a-authsimple:simple', {
  clientOptions: {
    username: 'tom',
    password: '123456',
  },
  state: {
    intention: 'login',
  },
});
```

* 简写方式：

``` typescript
const jwt = await this.bean.authSimple.authenticate({
  username: 'tom',
  password: '123456',
}, 'login');
```

### 3. 退出登录

``` typescript
await this.bean.passport.signout();
```

### 4. 参数配置

模块`a-authsimple`采用[password-hash-salt](https://www.npmjs.com/package/password-hash-salt)对 Password 进行 hash 处理

可以在 App Config 中修改参数配置

`src/backend/config/config/config.ts`

``` typescript
// modules
config.modules = {
  'a-authsimple': {
    passwordHash: {
      saltlen: 64,
      iterations: 10000,
      keylen: 64,
      digest: 'sha1',
    },
  },
};
```

## 源码解析

这里对模块`a-authsimple`的核心源码进行解析，从而说明如何开发一个新的 Provider

### 1. 创建Auth Provider

比如，在模块`a-authsimple`中创建一个局部中间件: `logger`

### 1. Cli命令

``` bash
$ vona :create:bean middleware logger --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Aspect/Middleware`
:::

