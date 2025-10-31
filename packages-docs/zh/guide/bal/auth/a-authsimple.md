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
```

### 3. 退出

``` typescript
```

### 4. 配置

## 源码解析