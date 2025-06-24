# Service

## 创建Service

比如，我们在模块 demo-student 中创建一个 Controller: `student`

### 1. Cli命令

``` bash
$ vona :create:bean service student --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Create/Service`
:::

## Service定义

``` typescript
@Service()
export class ServiceStudent extends BeanBase {}
```

- 继承自 BeanBase 基类
- 使用 Serivce 装饰器

## 使用Service

关于 Service 的使用可以从不同维度来讲
  * Service 的依赖注入和依赖查找，参见：[依赖注入](../ioc/dependency-injection.md), [依赖查找](../ioc/dependency-lookup.md)
  * Service 的模块内部与跨模块使用，参见：[模块Scope：Service](../scope/service.md)

## 1. 依赖注入

在模块 demo-student 的 ControllerStudent 中注入 ServiceStudent，代码如下：

* 基于 Class 类型

``` typescript
import { ServiceStudent } from '../service/student.ts';

class ControllerStudent {
  @Use()
  $$serviceStudent: ServiceStudent;
}
```

* 基于 Bean 标识

``` typescript
import type { ServiceStudent } from '../service/student.ts';

export class ControllerStudent {
  @Use('demo-student.service.student')
  $$serviceStudent: ServiceStudent;
}
```

- 由于导入的 ServiceStudent 是 type，因此需要指定 Service 的 Bean 标识

## 2. 依赖查找

