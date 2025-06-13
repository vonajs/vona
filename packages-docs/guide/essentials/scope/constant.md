# Constant

Modules can individually provide their own `Constant`

## Initialize code skeleton

::: tip
Context Menu - [Module Path]: `Vona Init/Constant`
:::

## Define Constant

Taking the module `home-index` as an example, define the `Constant` of the module:

`src/suite/a-home/modules/home-index/src/config/constants.ts`

```typescript{2-5}
export const constants = {
  gender: {
    male: 1,
    female: 2,
  },
} as const;
```

- Just define the required constants directly, and the system will automatically extract the type information of constants

## Use Constant

The `Constant` of the module can be obtained through the `Scope` instance

```typescript{3-4}
class ControllerHome {
  index() {
    console.log(this.scope.constant.gender.male);
    console.log(this.scope.constant.gender.female);
  }
}
```

## Use Constant cross-module

```typescript{3-4}
class ControllerHome {
  index() {
    console.log(this.$scope.homeIndex.constant.gender.male);
    console.log(this.$scope.homeIndex.constant.gender.female);
  }
}
```
