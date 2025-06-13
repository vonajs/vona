# Error错误异常

模块可以单独提供自己的 Error 错误异常

## 初始化代码骨架

::: tip
右键菜单 - [模块路径]: `Vona Init/Error`
:::

## 定义Error

定义 Error 分为两个步骤，以模块`home-index`为例：

### 1. 定义Error枚举

`src/suite/a-home/modules/home-index/src/config/errors.ts`

```typescript{2}
export enum Errors {
  ErrorTest = 1001,
}
```

- 约定：错误码 > 1000

### 2. 定义Error语言资源

英文：`src/suite/a-home/modules/home-index/src/config/locale/en-us.ts`

```typescript{2}
export default {
  ErrorTest: 'This is a error test',
};
```

中文：`src/suite/a-home/modules/home-index/src/config/locale/zh-cn.ts`

```typescript{2}
export default {
  ErrorTest: '这是一个错误测试',
};
```

## 使用Error

可以通过 Scope 实例直接抛出模块的 Error 错误异常

```typescript{3}
class ControllerHome {
  index() {
    this.scope.error.ErrorTest.throw();
  }
}
```

## 跨模块使用Error

```typescript{3}
class ControllerHome {
  index() {
    this.$scope.homeIndex.error.ErrorTest.throw();
  }
}
```
