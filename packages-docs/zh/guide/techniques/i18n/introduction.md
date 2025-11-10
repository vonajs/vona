# I18n国际化

模块可以单独提供自己的 I18n 语言资源

## 初始化代码骨架

### 1. Cli命令

``` bash
$ vona :init:locale demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Init/Locale`
:::

## 定义语言资源

以模块`demo-student`为例，定义模块的语言资源：

* 英文

`src/module/demo-student/src/config/locale/en-us.ts`

```diff
export default {
+ StudentName: 'Student Name',
};
```

* 中文

`src/module/demo-student/src/config/locale/zh-cn.ts`

```diff
export default {
+ StudentName: '学生名称',
};
```

## 使用语言资源

可以通过 Scope 实例提供的`locale`对象获取模块的语言资源

```typescript
class ControllerStudent {
  @Web.get('test')
  test() {
    // use current locale
    const message1 = this.scope.locale.StudentName();
    // use locale en-us
    const message2 = this.scope.locale.StudentName.locale('en-us');
    // use locale zh-cn
    const message3 = this.scope.locale.StudentName.locale('zh-cn');
    console.log(message1, message2, message3);
  }
}  
```

## 跨模块使用语言资源

```typescript
class ControllerStudent {
  @Web.get('test')
  test() {
    // use current locale
    const message1 = this.$scope.demoStudent.locale.StudentName();
    // use locale en-us
    const message2 = this.$scope.demoStudent.locale.StudentName.locale('en-us');
    // use locale zh-cn
    const message3 = this.$scope.demoStudent.locale.StudentName.locale('zh-cn');
    console.log(message1, message2, message3);
  }
}  
```

## 覆盖语言资源

可以使用`项目级别`的语言资源覆盖`模块级别`的语言资源

* 英文

`src/backend/config/locale/en-us.ts`

```diff
export default {
  modules: {
+   'demo-student': {
+     StudentName: 'Student Name!',
+   },
  },
};
```

* 中文

`src/backend/config/locale/zh-cn.ts`

```diff
export default {
  modules: {
+   'demo-student': {
+     StudentName: '学生名称!',
+   },
  },
};
```

## 当前locale

### 1. 获取当前locale

``` typescript
const locale = this.ctx.locale;
```

### 2. 设置当前locale

``` typescript
this.ctx.locale = 'en-us';
```

### 3. 获取缺省locale

``` typescript
const localeDefault = this.$scope.i18n.config.i18n.defaultLocale;
```

## 获取当前locale的规则

当用户访问后端 API 时，后端会自动根据规则获取当前 locale

### 1. 模块配置

I18n 是由模块 a-i18n 提供的核心能力，可以在 App config 中修改模块的配置：

`src/backend/config/config/config.ts`

``` typescript
// modules
config.modules = {
  'a-i18n': {
    i18n: {
      defaultLocale: 'en-us',
      queryField: 'x-vona-locale',
      headerField: 'x-vona-locale',
      cookieField: 'locale',
    },
  },
};
```

|名称|说明|
|--|--|
|defaultLocale|Default locale|
|queryField|从request query中获取当前locale，query key默认为`x-vona-locale`|
|headerField|从request header中获取当前locale，header key默认为`x-vona-locale`|
|cookieField|从request cookie中获取当前locale，cookie key默认为`locale`|

### 2. 规则次序

系统按以下次序，依次判断当前 locale

`queryField` > `headerField` > `cookieField` > `Header: Accept-Language` > `defaultLocale`

## 添加新的语言

VonaJS 默认提供了两个语言:`en-us`和`zh-cn`。下面演示如何添加新语言`zh-tw`

### 1. 添加类型定义

通过接口合并机制添加新语言的类型定义

在 VSCode 编辑器中，输入代码片段`recordlocale`，自动生成代码骨架:

``` typescript
declare module 'vona' {
  export interface ILocaleInfoRecord {
    : ILocaleInfo;
  }
}
```

调整代码，然后添加`zh-tw`

``` diff
declare module 'vona' {
  export interface ILocaleInfoRecord {
+   'zh-tw': ILocaleInfo;
  }
}
```

### 2. 添加语言资源

新建语言文件`zh-tw.ts`，然后添加语言资源

`src/module/demo-student/src/config/locale/zh-tw.ts`

``` typescript
export default {
  StudentName: '學生名稱',
};
```

## 复数

### 1. 定义语言资源

`src/module/demo-student/src/config/locale/en-us.ts`

```diff
export default {
+ TestApples_: '%d apples',
+ TestApples_0: 'no apples',
+ TestApples_1: 'one apple',
};
```

`src/module/demo-student/src/config/locale/zh-cn.ts`

```diff
export default {
+ TestApples_: '%d个苹果',
+ TestApples_0: '没有苹果',
};
```

### 2. 使用语言资源

``` typescript
this.ctx.locale = 'en-us';
const apple0 = this.scope.locale.TestApples_(0);
const apple1 = this.scope.locale.TestApples_(1);
const apple2 = this.scope.locale.TestApples_(2);
console.log(`${apple0}, ${apple1}, ${apple2}`);
```

控制台输出如下：

``` bash
no apples, one apple, 2 apples
```

- `TestApples_`: 缺省语言资源。语言资源添加后缀`_`，可以提示开发者该语言资源需要传入参数
- `TestApples_{n}`: 可以针对任何具体的`n`提供独立的语言资源。系统在进行语言翻译时，如果找不到具体`n`的语言资源，就使用缺省语言资源`TestApples_`

## 复数: 多参数

如果语言资源支持多参数，那么可以明确指定哪个参数支持复数

### 1. 定义语言资源

`src/module/demo-student/src/config/locale/en-us.ts`

```diff
export default {
+ TestNameApples_: '%s has %d apples',
+ TestNameApples_0_1: '%s has no apples',
+ TestNameApples_1_1: '%s has one apple',
};
```

`src/module/demo-student/src/config/locale/zh-cn.ts`

```diff
export default {
+ TestNameApples_: '%s有%d个苹果',
+ TestNameApples_0_1: '%s没有苹果',
};
```

### 2. 使用语言资源

``` typescript
this.ctx.locale = 'en-us';
const apple0 = this.scope.locale.TestNameApples_('Tom', 0);
const apple1 = this.scope.locale.TestNameApples_('Tom', 1);
const apple2 = this.scope.locale.TestNameApples_('Tom', 2);
console.log(`${apple0}, ${apple1}, ${apple2}`);
```

控制台输出如下：

``` bash
Tom has no apples, Tom has one apple, Tom has 2 apples
```

- `TestNameApples_`: 缺省语言资源。语言资源添加后缀`_`，可以提示开发者该语言资源需要传入参数
- `TestNameApples_{n}_{ordinal}`: `ordinal`代表参数序数

## Swagger/Openapi

