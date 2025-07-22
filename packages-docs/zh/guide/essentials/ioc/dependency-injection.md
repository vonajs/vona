# 依赖注入

Vona 通过`@Use`装饰器函数注入 Bean 实例

## 解析规则

Vona 采用模块化体系，Bean Class 都由不同的模块提供。注入模块内部的 Bean 时可以直接基于`Class类型`解析。在跨模块注入时可以基于`Bean标识`解析，而不是基于`Class类型/文件路径`解析，这样有利于实现模块之间的松耦合

## 依赖注入：基于Class类型

假设我们要在模块 home-index 的 ControllerHome 中注入模块 home-base 提供的 ServiceMenu，代码如下：

``` typescript
import { ServiceMenu } from 'vona-module-home-base';
export class ControllerHome {
  @Use()
  menu: ServiceMenu;
}  
```

## 依赖注入：基于Bean标识

``` typescript
import type { ServiceMenu } from 'vona-module-home-base';
export class ControllerHome {
  @Use('home-base.service.menu')
  menu: ServiceMenu;
}  
```

- 由于导入的 ServiceMenu 是 type，因此需要指定 Service 的 Bean 标识
