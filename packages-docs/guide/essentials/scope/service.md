# Service

Modules can individually provide their own `Services`

## Create Service

::: tip
Context Menu - [Module Path]: `Vona Create/Service`
:::

## Use Service

The `Service` of the module can be obtained through the `Scope` instance

For example, we use the Service `menu` provided by thie module home-base inside the current module: 

```typescript{3}
class ControllerMenu {
  retrieveMenus() {
    return this.scope.service.menu.retrieveMenus('');
  }
}
```

## Use Service cross-module

For example, we use the Service `menu` provided by thie module home-base inside the module home-index:

```typescript{3}
class ControllerHome {
  index() {
    return this.$scope.homeBase.service.menu.retrieveMenus('');
  }
}
```
