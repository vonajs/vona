# 角色

## a-user: IRoleBase

模块`a-user`提供了接口`IRoleBase`，约定了 Role 的基础字段

``` typescript
export interface IRoleBase {
  id: TableIdentity;
  name: string;
}
```

## a-user: bean.role

模块`a-user`提供了全局 Bean `bean.role`，为业务提供了通用的调用规范

``` typescript
// find role
const role = await this.bean.role.findOneById(roleId);
// find roles of user
const roles = await this.bean.role.findAllByUserId(userId);
```

* `bean.role`方法清单

|名称|说明|
|--|--|
|findOneByName|通过`name`查找角色|
|findOneById|通过`id`查找角色|
|findOne|查找角色|
|findAllByUserId|查找某个用户的所有角色|

## 角色: admin

在模块`home-user`的`meta.version`中自动创建`admin`角色

- 参见：[迁移与变更](../../essentials/api/version.md)

`src/suite/a-home/modules/home-user/src/bean/meta.version.ts`

``` typescript
async init(options) {
  if (options.version === 1) {
    // role: admin
    await this.scope.model.role.insert({
      name: 'admin',
    });
  }
}
```
