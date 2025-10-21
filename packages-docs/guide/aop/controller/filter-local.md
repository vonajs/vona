# Local Filter

## Create Filter

For example, create a local filter: `test` in the module demo-student to customize the log output for the custom error `demo-student:1001`

### 1. Cli command

``` bash
$ vona :create:bean filter test --module=demo-student
```

### 2. Menu command

::: tip
Context Menu - [Module Path]: `Vona Aspect/Filter`
:::

## Filter Definition

``` typescript
export interface IFilterOptionsTest extends IDecoratorFilterOptions {}

@Filter<IFilterOptionsTest>()
class FilterTest {
  async log(err: Error, _options: IFilterOptionsTest, next: Next): Promise<boolean> {
    // next
    if ((await next()) === true) return true;
    // custom
    if (err.code === 'demo-student:1001') {
      console.error(`Custom Error: ${err.code}, ${err.message}`);
      return true;
    }
    return false;
  }
}
```

- First call `next()`. If it returns true, the error has been handled, and then return directly
- Handle the specified error. If true is returned, it means it has been handled, ignoring the system's default logging behavior

## Using Filter

### 1. Annotating controller actions

``` diff
import { Aspect } from 'vona-module-a-aspect';

@Controller()
class ControllerStudent {
  @Web.post()
+ @Aspect.filter('demo-student:test')
  async create() {}
}
```

- `@Aspect.filter`: This decorator is used to use local filter. Simply pass the filter name
  - The test filter belongs to the `demo-student` module, so the full name is `demo-student:test`

### 2. Annotating controller class

You can use filter for controller classes so that all actions in the class will apply this filter

``` diff
import { Aspect } from 'vona-module-a-aspect';

@Controller()
+ @Aspect.filter('demo-student:test')
class ControllerStudent {
  @Web.post()
  async create() {}
}
```

## Filter Parameters

You can define parameters for filter, allowing for more flexible configuration of filter logic

For example, define the `name` parameter for the test filter to control the username that needs to be judged

### 1. Defining parameter types

``` diff
export interface IFilterOptionsTest extends IDecoratorFilterOptions {
+ name: string;
}
```

### 2. Providing default values ​​for parameters

``` diff
@Filter<IFilterOptionsTest>({
+ name: 'test',
})
```

### 3. Using Parameters

``` diff
export interface IFilterOptionsTest extends IDecoratorFilterOptions {
  name: string;
}

@Filter<IFilterOptionsTest>({
  name: 'test',
})
export class FilterTest extends BeanBase implements IFilterExecute {
  async execute(options: IFilterOptionsTest, next: Next): Promise<boolean> {
    const user = this.bean.passport.getCurrentUser();
-   if (!user || user.name !== 'test') this.app.throw(403);
+   if (!user || user.name !== options.name) this.app.throw(403);
    // next
    return next();
  }
}
```

### 4. Specify parameters when using

You can specify local filter parameters for a specific API

``` diff
class ControllerStudent {
  @Web.get()
+ @Aspect.filter('demo-student:test', { name: 'other-name' })
  async findMany() {}
}
```

- When using filter, just provide the parameter value directly

### 5. App config

Filter parameters can be configured in App config

`src/backend/config/config/config.ts`

``` typescript
// onions
config.onions = {
  filter: {
    'demo-student:test': {
      name: 'other-name',
    },
  },
};
```

### 6. Parameter precedence

`Specify parameters when using` > `App config` > `Default values`
