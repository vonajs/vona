# System Middleware

The difference between system middleware, global middleware, and local middleware:

1. `System middleware`: Executed before route matched
2. `Global middleware`/`Local middleware`: Executed after route matched

## Create Middleware

For example, we create a System Middleware `logger` in the module demo-student

### 1. Cli command

``` bash
$ vona :create:bean middlewareSystem logger --module=demo-student
```

### 2. Menu command

::: tip
Context Menu - [Module Path]: `Vona Aspect/Middleware System`
:::

## Middleware Definition

``` typescript
export interface IMiddlewareOptionsLogger extends IDecoratorMiddlewareOptionsGlobal {}

@Middleware<IMiddlewareOptionsLogger>({ global: true })
export class MiddlewareLogger extends BeanBase implements IMiddlewareExecute {
  async execute(_options: IMiddlewareOptionsLogger, next: Next) {
    const timeBegin = Date.now();
    const res = await next();
    const timeEnd = Date.now();
    console.log('time: ', timeEnd - timeBegin);
    return res;
  }
}
```

- `IMiddlewareOptionsLogger`: Defines middleware parameters
- `execute`: Outputs execution time

## Using Middleware

Unlike local middleware, the system automatically loads system middlewares and makes them effective

## Middleware Parameters

You can define parameters for middleware, allowing for more flexible configuration of middleware logic

For example, define the `prefix` parameter for the logger middleware to control the output format

### 1. Defining parameter types

``` diff
export interface IMiddlewareSystemOptionsLogger extends IDecoratorMiddlewareSystemOptions {
+ prefix: string;
}
```

### 2. Providing default values ​​for parameters

``` diff
@MiddlewareSystem<IMiddlewareSystemOptionsLogger>({
+ prefix: 'time',
})
```

### 3. Using Parameters

``` diff
export interface IMiddlewareSystemOptionsLogger extends IDecoratorMiddlewareSystemOptions {
  prefix: string;
}

@MiddlewareSystem<IMiddlewareSystemOptionsLogger>({
  prefix: 'time',
})
class MiddlewareSystemLogger {
  async execute(options: IMiddlewareSystemOptionsLogger, next: Next) {
    const timeBegin = Date.now();
    const res = await next();
    const timeEnd = Date.now();
-   console.log('time: ', timeEnd - timeBegin);    
+   console.log(`${options.prefix}: `, timeEnd - timeBegin);
    return res;
  }
}
```

### 4. App config

Middleware parameters can be configured in App config

`src/backend/config/config/config.ts`

``` typescript
// onions
config.onions = {
  middlewareSystem: {
    'demo-student:logger': {
      prefix: 'elapsed',
    },
  },
};
```

### 5. Parameters precedence

`App config` > `Default values`

## Middleware Order

Since system middlewares ard loaded and enabled by default, VonaJS provides two parameters to control the order in which middleware is loaded

### 1. dependencies

For example, the system has a built-in system middleware `a-core:notfound`, and we hope that the loading order is as follows: `a-core:notfound` > `Current`

``` diff
@MiddlewareSystem({
+ dependencies: 'a-core:notfound',
  prefix: 'time',
})
class MiddlewareSystemLogger {}
```

### 2. dependents

The order of `dependents` is just the opposite of `dependencies`. We hope that the loading order is as follows: `Current` > `a-core:notfound`

``` diff
@MiddlewareSystem({
+ dependents: 'a-core:notfound',
  prefix: 'time',
})
class MiddlewareSystemLogger {}
```

## Middleware enable/disable 

You can control `enable/disable` of global middleware for certain APIs

### 1. Enable

* Disabling an API

``` diff
class ControllerStudent {
  @Web.get()
+ @Aspect.middlewareGlobal('demo-student:logger', { enable: false })
  async findMany() {}
}
```

* Disable all APIs

`src/backend/config/config/config.ts`

``` diff
// onions
config.onions = {
  middleware: {
    'demo-student:logger': {
+     enable: false,
    },
  },
};
```

### 2. Meta

Allows global middleware to take effect in a specified operating environment

|Name|Type|Description|
|--|--|--|
|flavor|string\|string[]|See: [Runtime Environments and Flavors](../../techniques/mode-flavor/introduction.md)|
|mode|string\|string[]|See: [Runtime Environments and Flavors](../../techniques/mode-flavor/introduction.md)|
|instanceName|string\|string[]|See: [Multi-Instance/Multi-Tenancy](../../techniques/instance/introduction.md)|
|host|string\|string[]|Host|

* Example

``` diff
@Middleware({
  global: true,
+ meta: {
+   flavor: 'normal',
+   mode: 'dev',
+   instanceName: '',
+   host: 'localhost:7102',
+ },
})
class MiddlewareLogger {}
```

### 3. match/ignore

You can enable/disable global middleware for some specific APIs

|Name|Type|Description|
|--|--|--|
|match|string\|regexp\|(string\|regexp)[]|For which APIs to enable|
|ignore|string\|regexp\|(string\|regexp)[]|For which APIs to disable|

## Inspect

You can directly inspect the currently effective global middleware list in the Controller action

``` diff
class ControllerStudent {
  @Web.get()
  async findMany() {
+   this.bean.onion.middleware.inspect();
  }
}
```

- `this.bean.onion`: Get the global Service instance `onion`
- `.middleware`: Get the Service instance related to the middleware
- `.inspect`: Output the currently effective global middleware list

When accessing the `findMany` API, the current list of global middleware in effect will be automatically output to the console, as shown below:

![](../../../assets/img/aop/middleware-1.png)
