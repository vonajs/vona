# Config配置

模块可以单独提供自己的 Config 配置

## 初始化代码骨架

::: tip
右键菜单 - [模块路径]: `Vona Init/Config`
:::

## 定义Config

以模块`home-index`为例，定义模块的 Config 配置：

`src/suite/a-home/modules/home-index/src/config/config.ts`

```typescript{3}
export function config(_app: VonaApplication) {
  return {
    title: 'Hello World',
  };
}
```

- 直接定义所需要的配置字段即可，系统会自动提取 Config 的类型信息

## 使用Config

可以通过 Scope 实例获取模块的 Config 配置

```typescript{3}
class ControllerHome {
  index() {
    console.log(this.scope.config.title);
  }
}
```

## 跨模块使用Config

```typescript{3}
class ControllerHome {
  index() {
    console.log(this.$scope.homeIndex.config.title);
  }
}
```

## 覆盖Config配置

可以使用`项目级别`的 Config 配置覆盖`模块级别`的 Config 配置

`src/backend/config/config/config.ts`

```typescript{6-8}
export default function (_appInfo: VonaAppInfo) {
  const config = {} as VonaConfigOptional;

  // modules
  config.modules = {
    'home-index': {
      title: 'Hello World!!',
    },
  };

  return config;
}
```

- 将模块`home-index`的`title`修改为`Hello World!!`
