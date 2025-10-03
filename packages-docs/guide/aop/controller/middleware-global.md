# Global Middleware

## Create Middleware

For example, we create a Global Middleware `logger` in the module demo-student

### 1. Cli command

``` bash
$ vona :create:bean middleware logger --module=demo-student --boilerplate=cli/middlewareGlobal/boilerplate
```

### 2. Menu command

::: tip
Context Menu - [Module Path]: `Vona Aspect/Middleware Global`
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

Unlike local middleware, the system automatically loads global middlewares and makes them effective

## Middleware Parameters

You can define parameters for middleware, allowing for more flexible configuration of middleware logic

For example, define the `prefix` parameter for the logger middleware to control the output format

### 1. Defining parameter types

``` diff
export interface IMiddlewareOptionsLogger extends IDecoratorMiddlewareOptionsGlobal {
+ prefix: string;
}
```

### 2. Providing default values ​​for parameters

``` diff
@Middleware<IMiddlewareOptionsLogger>({
  global: true,
+ prefix: 'time',
})
```

### 3. Using Parameters

``` diff
export interface IMiddlewareOptionsLogger extends IDecoratorMiddlewareOptionsGlobal {
  prefix: string;
}

@Middleware<IMiddlewareOptionsLogger>({
  global: true,
  prefix: 'time',
})
class MiddlewareLogger {
  async execute(options: IMiddlewareOptionsLogger, next: Next) {
    const timeBegin = Date.now();
    const res = await next();
    const timeEnd = Date.now();
-   console.log('time: ', timeEnd - timeBegin);
+   console.log(`${options.prefix}: `, timeEnd - timeBegin);
    return res;
  }
}
```

### 4. Specify parameters when using

``` diff
class ControllerStudent {
  @Web.get()
+ @Aspect.middlewareGlobal('demo-student:logger', { prefix: 'elapsed' })
  async findMany() {}
}
```

- When using middleware, just provide the parameter value directly

### 5. App config

Middleware parameters can be configured in App config

`src/backend/config/config/config.ts`

``` typescript
// onions
config.onions = {
  middleware: {
    'demo-student:logger': {
      prefix: 'elapsed',
    },
  },
};
```

### 6. Parameter precedence

`Specify parameters when using` > `App config` > `Default values`

