# 局部管道

## 创建管道

比如，在模块 demo-student 中创建一个 局部管道: `number`，将请求参数转换为`number`类型

### 1. Cli命令

``` bash
$ vona :create:bean pipe number --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Aspect/Pipe`
:::

## 管道定义

``` typescript
export interface IPipeOptionsAdmin extends IDecoratorPipeOptions {}

@Pipe<IPipeOptionsAdmin>()
class PipeAdmin {
  async execute(_options: IPipeOptionsAdmin, next: Next): Promise<boolean> {
    const user = this.bean.passport.getCurrentUser();
    if (!user || user.name !== 'admin') this.app.throw(403);
    // next
    return next();
  }
}
```

- `getCurrentUser`: 取得当前用户

## 使用管道

### 1. 标注控制器方法

``` diff
import { Aspect } from 'vona-module-a-aspect';

@Controller()
class ControllerStudent {
  @Web.get()
+ @Aspect.pipe('demo-student:admin')
  async findMany() {}
}
```

- `@Aspect.pipe`: 此装饰器用于使用局部管道，只需传入管道的名称
  - admin 管道属于模块`demo-student`，因此完整的名称是`demo-student:admin`

### 2. 标注控制器类

可以针对控制器类使用管道，从而类中所有方法都会应用此管道

``` diff
import { Aspect } from 'vona-module-a-aspect';

@Controller()
+ @Aspect.pipe('demo-student:admin')
class ControllerStudent {
  @Web.get()
  async findMany() {}
}
```

## 管道参数

可以为管道定义参数，通过参数更灵活的配置管道逻辑

比如，为 admin 管道定义`name`参数，用于控制需要判断的用户名

### 1. 定义参数类型

``` diff
export interface IPipeOptionsAdmin extends IDecoratorPipeOptions {
+ name: string;
}
```

### 2. 提供参数缺省值

``` diff
@Pipe<IPipeOptionsAdmin>({
+ name: 'admin',
})
```

### 3. 使用参数

``` diff
export interface IPipeOptionsAdmin extends IDecoratorPipeOptions {
  name: string;
}

@Pipe<IPipeOptionsAdmin>({
  name: 'admin',
})
export class PipeAdmin extends BeanBase implements IPipeExecute {
  async execute(options: IPipeOptionsAdmin, next: Next): Promise<boolean> {
    const user = this.bean.passport.getCurrentUser();
-   if (!user || user.name !== 'admin') this.app.throw(403);
+   if (!user || user.name !== options.name) this.app.throw(403);
    // next
    return next();
  }
}
```

### 4. 使用时指定参数

可以针对某个 API 单独指定局部管道的参数

``` diff
class ControllerStudent {
  @Web.get()
+ @Aspect.pipe('demo-student:admin', { name: 'other-name' })
  async findMany() {}
}
```

- 在使用管道时直接提供参数值即可

### 5. App config配置

可以在 App config 中配置管道参数

`src/backend/config/config/config.ts`

``` typescript
// onions
config.onions = {
  pipe: {
    'demo-student:admin': {
      name: 'other-name',
    },
  },
};
```

### 6. 参数优先级

`使用时指定参数` > `App config配置` > `参数缺省值`
