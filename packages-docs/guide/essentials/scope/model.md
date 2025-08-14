# Model

Modules can individually provide their own `Models`

## Create Model

::: tip
Context Menu - [Module Path]: `Vona Create/Model`
:::

## Use Model

The `Model` of the module can be obtained through the `Scope` instance

For example, we use the Model `menu` provided by thie module home-base inside the current module: 

```typescript{3}
class ControllerMenu {
  async retrieveMenus() {
    const menus = await this.scope.model.menu.select();
  }
}
```

## Use Model cross-module

For example, we use the Model `menu` provided by thie module home-base inside the module home-index:

```typescript{3}
class ControllerHome {
  async index() {
    const menus = await this.$scope.homeBase.model.menu.select();
  }
}
```

You can also use `bean._getBean` to get the Model instance directly from the IOC container:

``` typescript
class ControllerHome {
  async index() {
    const menus = await this.bean._getBean('home-base.model.menu').select();
  }
}
```
