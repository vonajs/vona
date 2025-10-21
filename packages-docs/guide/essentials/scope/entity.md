# Entity

Modules can individually provide their own `Entities`

## Create Entity

### 1. Cli command

``` bash
$ vona :create:bean entity menu --module=home-base
```

### 2. Menu command

::: tip
Context Menu - [Module Path]: `Vona Create/Entity`
:::

## Use Entity

The `Entity` of the module can be obtained through the `Scope` instance

For example, we use the Entity `menu` provided by thie module home-base inside the current module: 

```typescript{3}
class ControllerMenu {
  async retrieveMenus() {
    const entityMenu = this.scope.entity.menu;
  }
}
```

## Use Entity cross-module

For example, we use the Entity `menu` provided by thie module home-base inside the module home-index:

```typescript{3}
class ControllerHome {
  index() {
    const entityMenu = this.$scope.homeBase.entity.menu;
  }
}
```