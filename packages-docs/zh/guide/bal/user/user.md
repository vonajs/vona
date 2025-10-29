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
|findOne|通过更多条件查找用户|
|update|更新用户|
|remove|删除用户|

## 匿名用户

## 注册

## 激活

## 用户: admin

## 最后讲home-user适配器

