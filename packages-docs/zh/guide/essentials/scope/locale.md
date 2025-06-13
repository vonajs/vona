# I18n国际化

模块可以单独提供自己的 I18n 语言资源

## 初始化代码骨架

::: tip
右键菜单 - [模块路径]: `Vona Init/Locale`
:::

## 定义语言资源

以模块`home-index`为例，定义模块的语言资源：

英文：`src/suite/a-home/modules/home-index/src/config/locale/en-us.ts`

```typescript{2}
export default {
  HelloWorld: 'Hello World',
};
```

中文：`src/suite/a-home/modules/home-index/src/config/locale/zh-cn.ts`

```typescript{2}
export default {
  HelloWorld: '您好世界',
};
```

## 使用语言资源

可以通过 Scope 实例提供的`locale`对象获取模块的语言资源

```typescript{3-9}
class ControllerHome {
  index() {
    // use current locale
    const message1 = this.scope.locale.HelloWorld();
    // use locale en-us
    const message2 = this.scope.locale.HelloWorld.locale('en-us');
    // use locale zh-cn
    const message3 = this.scope.locale.HelloWorld.locale('zh-cn');
    console.log(message1, message2, message3);
  }
}
```

## 跨模块使用语言资源

```typescript{3-9}
class ControllerHome {
  index() {
    // use current locale
    const message1 = this.$scope.homeIndex.locale.HelloWorld();
    // use locale en-us
    const message2 = this.$scope.homeIndex.locale.HelloWorld.locale('en-us');
    // use locale zh-cn
    const message3 = this.$scope.homeIndex.locale.HelloWorld.locale('zh-cn');
    console.log(message1, message2, message3);
  }
}
```

## 覆盖语言资源

可以使用`项目级别`的语言资源覆盖`模块级别`的语言资源

英文：`src/backend/config/locale/en-us.ts`

```typescript{3-5}
export default {
  modules: {
    'home-index': {
      HelloWorld: 'Hello World!!!',
    },
  },
};
```

中文：`src/backend/config/locale/zh-cn.ts`

```typescript{3-5}
export default {
  modules: {
    'home-index': {
      HelloWorld: '您好世界!!!',
    },
  },
};
```
