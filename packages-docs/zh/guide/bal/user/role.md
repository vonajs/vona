# 角色

## 基础字段

## 全局Bean：role

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
