# Entity

模块可以单独提供自己的 Entities

## 创建Entity

::: tip
右键菜单 - [模块路径]: `Vona Create/Entity`
:::

## 本模块使用Entity

可以通过 Scope 实例获取模块的 Entity

比如，我们在模块 home-base 内部使用本模块提供的 Entity：`menu`

```typescript{3}
class ControllerMenu {
  async retrieveMenus() {
    const entityMenu = this.scope.entity.menu;
  }
}
```

## 跨模块使用Entity

比如，我们在模块 home-index 中使用模块 home-base 提供的 Entity：`menu`

```typescript{3}
class ControllerHome {
  index() {
    const entityMenu = this.$scope.homeBase.entity.menu;
  }
}
```
