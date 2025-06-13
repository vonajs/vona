# I18n

Modules can individually provide their own `I18n` language resources

## Initialize code skeleton

::: tip
Context Menu - [Module Path]: `Vona Init/Locale`
:::

## Define language resources

Taking the module `home-index` as an example, define the `I18n` language resources of the module:

English: `src/suite/a-home/modules/home-index/src/config/locale/en-us.ts`

```typescript{2}
export default {
  HelloWorld: 'Hello World',
};
```

Chinese: `src/suite/a-home/modules/home-index/src/config/locale/zh-cn.ts`

```typescript{2}
export default {
  HelloWorld: '您好世界',
};
```

## Use language resources

The `I18n` language resources of the module can be obtained through the `locale` object of the `Scope` instance

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

## Use language resources cross-module

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

## Override language resources

You can use `project-level` language resources to override `module-level` language resources

English: `src/backend/config/locale/en-us.ts`

```typescript{3-5}
export default {
  modules: {
    'home-index': {
      HelloWorld: 'Hello World!!!',
    },
  },
};
```

Chinese: `src/backend/config/locale/zh-cn.ts`

```typescript{3-5}
export default {
  modules: {
    'home-index': {
      HelloWorld: '您好世界!!!',
    },
  },
};
```
