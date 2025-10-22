# AOP Method

`AOP Method` allows us to extend the logic directly on the Class Method through decorators

## Create AOP Method

For example, we create a AOP Method `log` in the module demo-student to output the execution time of method

### 1. Cli command

``` bash
$ vona :create:bean aopMethod log --module=demo-student
```

### 2. Menu command

::: tip
Context Menu - [Module Path]: `Vona Aspect/AOP Method`
:::

## AOP Method Definition

``` typescript
export interface IAopMethodOptionsLog extends IDecoratorAopMethodOptions {}

@AopMethod<IAopMethodOptionsLog>()
class AopMethodLog {
  async execute(_options: IAopMethodOptionsLog, _args: [], next: Next | NextSync, _receiver: any, _prop: string): Promise<any> {
    const timeBegin = Date.now();
    const res = await next();
    const timeEnd = Date.now();
    console.log('time:', timeEnd - timeBegin);
    return res;
  }
}
```

- `IAopMethodOptionsLog`: Defines aop method parameters
- `execute`: Outputs execution time

## Using AOP Method

### 1. Annotating controller actions

``` diff
import { Aspect } from 'vona-module-a-aspect';

@Controller()
class ControllerStudent {
  @Web.get()
+ @Aspect.aopMethod('demo-student:log')
  async findMany() {}
}
```

- `@Aspect.aopMethod`: This decorator is used to use AOP Method. Simply pass the AOP Method name
  - The log AOP Method belongs to the `demo-student` module, so the full name is `demo-student:log`

### 2. Annotating service methods

``` diff
import { Aspect } from 'vona-module-a-aspect';

@Service()
class ServiceStudent {
+ @Aspect.aopMethod('demo-student:log')
  async findMany(){}
```

## AOP Method Parameters

You can define parameters for middleware, allowing for more flexible configuration of middleware logic

For example, define the `prefix` parameter for the logger middleware to control the output format

### 1. Defining parameter types

``` diff
export interface IAOP MethodOptionsLogger extends IDecoratorAOP MethodOptions {
+ prefix: string;
}
```

### 2. Providing default values ​​for parameters

``` diff
@AOP Method<IAOP MethodOptionsLogger>({
+ prefix: 'time',
})
```

### 3. Using Parameters

``` diff
export interface IAOP MethodOptionsLogger extends IDecoratorAOP MethodOptions {
  prefix: string;
}

@AOP Method<IAOP MethodOptionsLogger>({
  prefix: 'time',
})
class AOP MethodLogger {
  async execute(options: IAOP MethodOptionsLogger, next: Next) {
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

You can specify local middleware parameters for a specific API

``` diff
class ControllerStudent {
  @Web.get()
+ @Aspect.middleware('demo-student:logger', { prefix: 'elapsed' })
  async findMany() {}
}
```

- When using middleware, just provide the parameter value directly

### 5. App config

AOP Method parameters can be configured in App config

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
