# Service

模块可以单独提供自己的 Services

## 创建Service

::: tip
右键菜单 - [模块路径]: `Vona Create/Service`
:::

## 本模块使用Service

可以通过 Scope 实例获取模块的 Service

比如，我们在模块 home-base 内部使用本模块提供的 Service：`menu`

```typescript{3}
class ControllerMenu {
  retrieveMenus() {
    return this.scope.service.menu.retrieveMenus('');
  }
}
```

## 跨模块使用Service

比如，我们在模块 home-index 中使用模块 home-base 提供的 Service：`menu`

```typescript{3}
class ControllerHome {
  index() {
    return this.$scope.homeBase.service.menu.retrieveMenus('');
  }
}
```
