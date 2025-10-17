# Global Pipe

## Create Pipe

For example, create a global pipe `number` in the module demo-student to check whether the current username is `number`. If not, an exception is thrown

### 1. Cli command

``` bash
$ vona :create:bean pipe number --module=demo-student --boilerplate=cli/pipeGlobal/boilerplate
```

### 2. Menu command

::: tip
Context Menu - [Module Path]: `Vona Aspect/Pipe Global`
:::

## Pipe Definition

``` typescript
export interface IPipeOptionsNumber extends IDecoratorPipeOptionsGlobal {}

@Pipe<IPipeOptionsNumber>({ global: true })
export class PipeNumber {
  async execute(_options: IPipeOptionsNumber, next: Next): Promise<boolean> {
    const user = this.bean.passport.getCurrentUser();
    if (!user || user.name !== 'number') this.app.throw(403);
    // next
    return next();
  }
}
```

- `getCurrentUser`: Get the current user

## Using Pipe

Unlike local pipe, the system automatically loads global pipes and makes them effective

## Pipe Parameters

You can define parameters for pipe, allowing for more flexible configuration of pipe logic

For example, define the `name` parameter for the number pipe to control the username that needs to be judged

### 1. Defining parameter types

``` diff
export interface IPipeOptionsNumber extends IDecoratorPipeOptionsGlobal {
+ name: string;
}
```

### 2. Providing default values ​​for parameters

``` diff
@Pipe<IPipeOptionsNumber>({
  global: true,
+ name: 'number',
})
```

### 3. Using Parameters

``` diff
export interface IPipeOptionsNumber extends IDecoratorPipeOptionsGlobal {
  name: string;
}

@Pipe<IPipeOptionsNumber>({
  global: true,
  name: 'number',
})
export class PipeNumber extends BeanBase implements IPipeExecute {
  async execute(options: IPipeOptionsNumber, next: Next): Promise<boolean> {
    const user = this.bean.passport.getCurrentUser();
-   if (!user || user.name !== 'number') this.app.throw(403);
+   if (!user || user.name !== options.name) this.app.throw(403);
    // next
    return next();
  }
}
```

### 4. Specify parameters when using

You can specify global pipe parameters for a specific API

``` diff
class ControllerStudent {
  @Web.get()
+ @Aspect.pipeGlobal('demo-student:number', { name: 'other-name' })
  async findMany() {}
}
```

- When using pipe, just provide the parameter value directly

### 5. App config

Pipe parameters can be configured in App config

`src/backend/config/config/config.ts`

``` typescript
// onions
config.onions = {
  pipe: {
    'demo-student:number': {
      name: 'other-name',
    },
  },
};
```

### 6. Parameter precedence

`Specify parameters when using` > `App config` > `Default values`

## Pipe Order

Since global pipes ard loaded and enabled by default, VonaJS provides two parameters to control the order in which pipe is loaded

### 1. dependencies

For example, the system has a built-in global pipe `a-user:passport`, and we hope that the loading order is as follows: `a-user:passport` > `Current`

``` diff
@Pipe({
  global: true,
+ dependencies: 'a-user:passport',
  name: 'number',
})
class PipeNumber {}
```

### 2. dependents

The order of `dependents` is just the opposite of `dependencies`. We hope that the loading order is as follows: `Current` > `a-user:passport`

``` diff
@Pipe({
  global: true,
+ dependents: 'a-user:passport',
  name: 'number',
})
class PipeNumber {}
```

## Pipe enable/disable

You can control `enable/disable` of global pipe for certain APIs

### 1. Enable

* Disable for an API

``` diff
class ControllerStudent {
  @Web.get()
+ @Aspect.pipeGlobal('demo-student:number', { enable: false })
  async findMany() {}
}
```

* Disable for all APIs

`src/backend/config/config/config.ts`

``` diff
// onions
config.onions = {
  pipe: {
    'demo-student:number': {
+     enable: false,
    },
  },
};
```

### 2. Meta

Allows global pipe to take effect in a specified operating environment

|Name|Type|Description|
|--|--|--|
|flavor|string\|string[]|See: [Runtime Environments and Flavors](../../techniques/mode-flavor/introduction.md)|
|mode|string\|string[]|See: [Runtime Environments and Flavors](../../techniques/mode-flavor/introduction.md)|
|instanceName|string\|string[]|See: [Multi-Instance/Multi-Tenancy](../../techniques/instance/introduction.md)|
|host|string\|string[]|Host|

* Example

``` diff
@Pipe({
  global: true,
+ meta: {
+   flavor: 'normal',
+   mode: 'dev',
+   instanceName: '',
+   host: 'localhost:7102',
+ },
})
class PipeNumber {}
```

### 3. match/ignore
    
You can enable/disable global pipe for some specific APIs    

|Name|Type|Description|
|--|--|--|
|match|string\|regexp\|(string\|regexp)[]|For which APIs to enable|
|ignore|string\|regexp\|(string\|regexp)[]|For which APIs to disable|

## Inspect

You can directly inspect the currently effective global pipe list in the Controller action

``` diff
class ControllerStudent {
  @Web.get()
  async findMany() {
+   this.bean.onion.pipe.inspect();
  }
}
```

- `this.bean.onion`: Get the global Service instance `onion`
- `.pipe`: Get the Service instance related to the pipe
- `.inspect`: Output the currently effective global pipe list

When accessing the `findMany` API, the current list of global pipe in effect will be automatically output to the console, as shown below:

![](../../../assets/img/aop/pipe-1.png)
