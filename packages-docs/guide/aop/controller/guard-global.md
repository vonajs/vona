# Global Guard

## Create Guard

For example, create a global guard `admin` in the module demo-student to check whether the current username is `admin`. If not, an exception is thrown

### 1. Cli command

``` bash
$ vona :create:bean guard admin --module=demo-student --boilerplate=cli/guardGlobal/boilerplate
```

### 2. Menu command

::: tip
Context Menu - [Module Path]: `Vona Aspect/Guard Global`
:::

## Guard Definition

``` typescript
export interface IGuardOptionsAdmin extends IDecoratorGuardOptionsGlobal {}

@Guard<IGuardOptionsAdmin>({ global: true })
export class GuardAdmin {
  async execute(_options: IGuardOptionsAdmin, next: Next): Promise<boolean> {
    const user = this.bean.passport.getCurrentUser();
    if (!user || user.name !== 'admin') this.app.throw(403);
    // next
    return next();
  }
}
```

- `getCurrentUser`: Get the current user

## Using Guard

Unlike local guard, the system automatically loads global guards and makes them effective

## Guard Parameters

You can define parameters for guard, allowing for more flexible configuration of guard logic

For example, define the `name` parameter for the admin guard to control the username that needs to be judged

### 1. Defining parameter types

``` diff
export interface IGuardOptionsAdmin extends IDecoratorGuardOptionsGlobal {
+ name: string;
}
```

### 2. Providing default values ​​for parameters

``` diff
@Guard<IGuardOptionsAdmin>({
  global: true,
+ name: 'admin',
})
```

### 3. Using Parameters

``` diff
export interface IGuardOptionsAdmin extends IDecoratorGuardOptionsGlobal {
  name: string;
}

@Guard<IGuardOptionsAdmin>({
  global: true,
  name: 'admin',
})
export class GuardAdmin extends BeanBase implements IGuardExecute {
  async execute(options: IGuardOptionsAdmin, next: Next): Promise<boolean> {
    const user = this.bean.passport.getCurrentUser();
-   if (!user || user.name !== 'admin') this.app.throw(403);
+   if (!user || user.name !== options.name) this.app.throw(403);
    // next
    return next();
  }
}
```

### 4. Specify parameters when using

可以针对某个 API 单独指定全局守卫的参数

``` diff
class ControllerStudent {
  @Web.get()
+ @Aspect.guardGlobal('demo-student:admin', { name: 'other-name' })
  async findMany() {}
}
```

在使用守卫时直接提供参数值即可

### 5. App config配置

可以在 App config 中配置守卫参数

`src/backend/config/config/config.ts`

``` typescript
// onions
config.onions = {
  guard: {
    'demo-student:admin': {
      name: 'other-name',
    },
  },
};
```

### 6. 参数优先级

`使用时指定参数` > `App config配置` > `参数缺省值`

## 守卫顺序

由于全局守卫是默认加载并生效的，所以，VonaJS 提供了两个参数，用于控制守卫的加载顺序

### 1. dependencies

比如，系统有一个内置全局守卫`a-user:passport`，我们希望加载顺序如下：`a-user:passport` > `Current`

``` diff
@Guard({
  global: true,
+ dependencies: 'a-user:passport',
  name: 'admin',
})
class GuardAdmin {}
```

### 2. dependents

`dependents`的顺序刚好与`dependencies`相反，我们希望加载顺序如下：`Current` > `a-user:passport`

``` diff
@Guard({
  global: true,
+ dependents: 'a-user:passport',
  name: 'admin',
})
class GuardAdmin {}
```

## 守卫启用/禁用

可以针对某些 API 控制全局守卫的`启用/禁用`

### 1. Enable

* 针对某个 API 禁用

``` diff
class ControllerStudent {
  @Web.get()
+ @Aspect.guardGlobal('demo-student:admin', { enable: false })
  async findMany() {}
}
```

* 针对所有 API 禁用

`src/backend/config/config/config.ts`

``` diff
// onions
config.onions = {
  guard: {
    'demo-student:admin': {
+     enable: false,
    },
  },
};
```

### 2. Meta

可以让全局守卫在指定的运行环境生效

|名称|类型|说明|
|--|--|--|
|flavor|string\|string[]|参见: [运行环境与Flavor](../../techniques/mode-flavor/introduction.md)|
|mode|string\|string[]|参见: [运行环境与Flavor](../../techniques/mode-flavor/introduction.md)|
|instanceName|string\|string[]|参见: [多实例/多租户](../../techniques/instance/introduction.md)|
|host|string\|string[]|主机名|

* 举例

``` diff
@Guard({
  global: true,
+ meta: {
+   flavor: 'normal',
+   mode: 'dev',
+   instanceName: '',
+   host: 'localhost:7102',
+ },
})
class GuardAdmin {}
```

### 3. match/ignore
    
可以针对指定的 API 启用/禁用全局守卫

|名称|类型|说明|
|--|--|--|
|match|string\|regexp\|(string\|regexp)[]|针对哪些API启用|
|ignore|string\|regexp\|(string\|regexp)[]|针对哪些API禁用|

## 查看当前生效的全局守卫清单

可以直接在 Controller action 中输出当前生效的全局守卫清单

``` diff
class ControllerStudent {
  @Web.get()
  async findMany() {
+   this.bean.onion.guard.inspect();
  }
}
```

- `this.bean.onion`: 取得全局 Service 实例 `onion`
- `.guard`: 取得与守卫相关的 Service 实例
- `.inspect`: 输出当前生效的全局守卫清单

当访问`findMany` API 时，会自动在控制台输出当前生效的全局守卫清单，效果如下：

![](../../../assets/img/aop/guard-1.png)
