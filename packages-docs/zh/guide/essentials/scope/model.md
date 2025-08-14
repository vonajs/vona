# Model

模块可以单独提供自己的 Models

## 创建Model

::: tip
右键菜单 - [模块路径]: `Vona Create/Model`
:::

## 本模块使用Model

可以通过 Scope 实例获取模块的 Model

比如，我们在模块 home-base 内部使用本模块提供的 Model：`menu`

```typescript{3}
class ControllerMenu {
  async retrieveMenus() {
    const menus = await this.scope.model.menu.select();
  }
}
```

## 跨模块使用Model

比如，我们在模块 home-index 中使用模块 home-base 提供的 Model：`menu`

```typescript{3}
class ControllerHome {
  async index() {
    const menus = await this.$scope.homeBase.model.menu.select();
  }
}
```

也可以使用`bean._getBean`从 IOC 容器中直接获取 Model 实例：

``` typescript
class ControllerHome {
  async index() {
    const menus = await this.bean._getBean('home-base.model.menu').select();
  }
}
```
