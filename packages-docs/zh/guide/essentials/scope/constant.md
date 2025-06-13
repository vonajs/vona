# Constant常量

模块可以单独提供自己的 Constant 常量

## 初始化代码骨架

::: tip
右键菜单 - [模块路径]: `Vona Init/Constant`
:::

## 定义Constant

以模块`home-index`为例，定义模块的 Constant 常量：

`src/suite/a-home/modules/home-index/src/config/constants.ts`

```typescript{2-5}
export const constants = {
  gender: {
    male: 1,
    female: 2,
  },
} as const;
```

- 直接定义所需要的常量即可，系统会自动提取 Constant 的类型信息

## 使用Constant

可以通过 Scope 实例获取模块的 Constant 常量

```typescript{3-4}
class ControllerHome {
  index() {
    console.log(this.scope.constant.gender.male);
    console.log(this.scope.constant.gender.female);
  }
}
```

## 跨模块使用Constant

```typescript{3-4}
class ControllerHome {
  index() {
    console.log(this.$scope.homeIndex.constant.gender.male);
    console.log(this.$scope.homeIndex.constant.gender.female);
  }
}
```
