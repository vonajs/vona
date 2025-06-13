# Error Exception

Modules can individually provide their own `Error` exceptions

## Initialize code skeleton

::: tip
Context Menu - [Module Path]: `Vona Init/Error`
:::

## Define Error

It takes two steps to define `Error`. Taking the module `home-index` as an example:

### 1. Define Error enum

`src/suite/a-home/modules/home-index/src/config/errors.ts`

```typescript{2}
export enum Errors {
  ErrorTest = 1001,
}
```

- Convention: Error Code > 1000

### 2. Define Error language resources

English: `src/suite/a-home/modules/home-index/src/config/locale/en-us.ts`

```typescript{2}
export default {
  ErrorTest: 'This is a error test',
};
```

Chinese: `src/suite/a-home/modules/home-index/src/config/locale/zh-cn.ts`

```typescript{2}
export default {
  ErrorTest: '这是一个错误测试',
};
```

## Use Error

You can directly throw the module's `Error` exception through the `Scope` instance

```typescript{3}
class ControllerHome {
  index() {
    this.scope.error.ErrorTest.throw();
  }
}
```

## Use Error cross-module

```typescript{3}
class ControllerHome {
  index() {
    this.$scope.homeIndex.error.ErrorTest.throw();
  }
}
```
