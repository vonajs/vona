# 局部过滤器

## 创建过滤器

比如，在模块 demo-student 中创建一个 局部过滤器: `test`，对自定义错误`demo-student:1001`进行个性化的日志输出控制

### 1. Cli命令

``` bash
$ vona :create:bean filter test --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Aspect/Filter`
:::

## 过滤器定义

``` typescript
export interface IFilterOptionsAdmin extends IDecoratorFilterOptions {}

@Filter<IFilterOptionsAdmin>()
class FilterAdmin {
  async execute(_options: IFilterOptionsAdmin, next: Next): Promise<boolean> {
    const user = this.bean.passport.getCurrentUser();
    if (!user || user.name !== 'admin') this.app.throw(403);
    // next
    return next();
  }
}
```

- `getCurrentUser`: 取得当前用户

## 使用过滤器

### 1. 标注控制器方法

``` diff
import { Aspect } from 'vona-module-a-aspect';

@Controller()
class ControllerStudent {
  @Web.get()
+ @Aspect.filter('demo-student:admin')
  async findMany() {}
}
```

- `@Aspect.filter`: 此装饰器用于使用局部过滤器，只需传入过滤器的名称
  - admin 过滤器属于模块`demo-student`，因此完整的名称是`demo-student:admin`

### 2. 标注控制器类

可以针对控制器类使用过滤器，从而类中所有方法都会应用此过滤器

``` diff
import { Aspect } from 'vona-module-a-aspect';

@Controller()
+ @Aspect.filter('demo-student:admin')
class ControllerStudent {
  @Web.get()
  async findMany() {}
}
```

## 过滤器参数

可以为过滤器定义参数，通过参数更灵活的配置过滤器逻辑

比如，为 admin 过滤器定义`name`参数，用于控制需要判断的用户名

### 1. 定义参数类型

``` diff
export interface IFilterOptionsAdmin extends IDecoratorFilterOptions {
+ name: string;
}
```

### 2. 提供参数缺省值

``` diff
@Filter<IFilterOptionsAdmin>({
+ name: 'admin',
})
```

### 3. 使用参数

``` diff
export interface IFilterOptionsAdmin extends IDecoratorFilterOptions {
  name: string;
}

@Filter<IFilterOptionsAdmin>({
  name: 'admin',
})
export class FilterAdmin extends BeanBase implements IFilterExecute {
  async execute(options: IFilterOptionsAdmin, next: Next): Promise<boolean> {
    const user = this.bean.passport.getCurrentUser();
-   if (!user || user.name !== 'admin') this.app.throw(403);
+   if (!user || user.name !== options.name) this.app.throw(403);
    // next
    return next();
  }
}
```

### 4. 使用时指定参数

可以针对某个 API 单独指定局部过滤器的参数

``` diff
class ControllerStudent {
  @Web.get()
+ @Aspect.filter('demo-student:admin', { name: 'other-name' })
  async findMany() {}
}
```

- 在使用过滤器时直接提供参数值即可

### 5. App config配置

可以在 App config 中配置过滤器参数

`src/backend/config/config/config.ts`

``` typescript
// onions
config.onions = {
  filter: {
    'demo-student:admin': {
      name: 'other-name',
    },
  },
};
```

### 6. 参数优先级

`使用时指定参数` > `App config配置` > `参数缺省值`
