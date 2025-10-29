# 用户

VonaJS 为了兼顾`开箱即用`与`灵活定制`的架构设计理念，将用户体系分为两个部分：

- 模块`a-user`: 提供通用能力
- 模块`home-user`: 提供定制能力

## a-user: IUserBase

模块`a-user`提供了接口`IUserBase`，约定了 User 的基础字段

``` typescript
export interface IUserBase {
  id: TableIdentity;
  name: string;
  avatar?: string;
  email?: string;
  mobile?: string;
  activated?: boolean;
  locale?: keyof ILocaleInfos | undefined;
  anonymous?: boolean;
}
```

## a-user: bean.user

模块`a-user`提供了全局 Bean `bean.user`，为业务提供了通用的调用规范

``` typescript
// find user
const user = await this.bean.user.findOneById(userId);
// activate user
this.bean.user.activate(user);
```

* `bean.user`方法清单

|名称|说明|
|--|--|
|activate|激活用户|
|register|注册用户|
|registerByProfile|使用profile数据注册用户，profile数据来自第三方认证|
|createAnonymous|创建匿名用户|
|findOneByName|通过`name`查找用户|
|findOneById|通过`id`查找用户|
|findOne|查找用户|
|updateById|通过`id`更新用户|
|update|更新用户|
|removeById|通过`id`删除用户|
|remove|删除用户|

## home-user适配器: ServiceUserAdapter

模块`home-user`提供了适配器`ServiceUserAdapter`，允许我们定制用户的操作逻辑。业务代码调用`bean.user`，`bean.user`调用`ServiceUserAdapter`，从而实现了`开箱即用`与`灵活定制`的完美结合

`src/suite/a-home/modules/home-user/src/service/userAdapter.ts`

|名称|说明|
|--|--|
|create|创建用户|
|userOfProfile|将profile数据转换为user|
|createAnonymous|创建匿名用户|
|findOneByName|通过`name`查找用户|
|findOne|查找用户|
|update|更新用户|
|remove|删除用户|
|setActivated|设置激活状态|

## 获取当前用户

### 参数装饰器

``` diff
import type { IUserBase } from 'vona-module-a-user';

class ControllerStudent {
  @Web.get('test')
+ test(@Arg.user() user: IUserBase) {
    console.log(user);
  }
}  
```

### this.bean.passport

``` diff
import type { IUserBase } from 'vona-module-a-user';

class ControllerStudent {
  @Web.get('test')
  test() {
+   const user = this.bean.passport.getCurrentUser();
    console.log(user);
  }
}  
```

## 匿名用户

当匿名用户访问 API 时，系统会自动创建一个匿名 user 对象

``` diff
class ControllerStudent {
  @Web.get('test')
  test(@Arg.user() user: IUserBase) {
+   console.log(user.anonymous);
  }
}  
```


## 注册

## 激活

## 用户: admin


