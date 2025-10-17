# Local Pipe

## Create Pipe

For example, create a local pipe `number` in the module demo-student to convert the request parameter to `number` type

### 1. Cli command

``` bash
$ vona :create:bean pipe number --module=demo-student
```

### 2. Menu command

::: tip
Context Menu - [Module Path]: `Vona Aspect/Pipe`
:::

## Pipe Definition

``` typescript
export type TypePipeNumberData = unknown;

export type TypePipeNumberResult = number;

export interface IPipeOptionsNumber extends IDecoratorPipeOptions {}

@Pipe<IPipeOptionsNumber>()
class PipeNumber {
  async transform(value: TypePipeNumberData, _metadata: RouteHandlerArgumentMeta, _options: IPipeOptionsNumber): Promise<TypePipeNumberResult> {
    const valueNew = Number(value);
    if (Number.isNaN(valueNew)) this.app.throw(400);
    return valueNew;
  }
}
```

- `getCurrentUser`: Get the current user

## Using Pipe

### 1. Annotating controller actions

``` diff
import { Aspect } from 'vona-module-a-aspect';

@Controller()
class ControllerStudent {
  @Web.get()
+ @Aspect.pipe('demo-student:number')
  async findMany() {}
}
```

- `@Aspect.pipe`: This decorator is used to use local pipe. Simply pass the pipe name
  - The number pipe belongs to the `demo-student` module, so the full name is `demo-student:number`

### 2. Annotating controller class

You can use pipe for controller classes so that all actions in the class will apply this pipe

``` diff
import { Aspect } from 'vona-module-a-aspect';

@Controller()
+ @Aspect.pipe('demo-student:number')
class ControllerStudent {
  @Web.get()
  async findMany() {}
}
```

## Pipe Parameters

You can define parameters for pipe, allowing for more flexible configuration of pipe logic

For example, define the `name` parameter for the number pipe to control the username that needs to be judged

### 1. Defining parameter types

``` diff
export interface IPipeOptionsAdmin extends IDecoratorPipeOptions {
+ name: string;
}
```

### 2. Providing default values ​​for parameters

``` diff
@Pipe<IPipeOptionsAdmin>({
+ name: 'number',
})
```

### 3. Using Parameters

``` diff
export interface IPipeOptionsAdmin extends IDecoratorPipeOptions {
  name: string;
}

@Pipe<IPipeOptionsAdmin>({
  name: 'number',
})
export class PipeAdmin extends BeanBase implements IPipeExecute {
  async execute(options: IPipeOptionsAdmin, next: Next): Promise<boolean> {
    const user = this.bean.passport.getCurrentUser();
-   if (!user || user.name !== 'number') this.app.throw(403);
+   if (!user || user.name !== options.name) this.app.throw(403);
    // next
    return next();
  }
}
```

### 4. Specify parameters when using

You can specify local pipe parameters for a specific API

``` diff
class ControllerStudent {
  @Web.get()
+ @Aspect.pipe('demo-student:number', { name: 'other-name' })
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
