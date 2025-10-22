# 魔术方法

可以在 Class 内部通过`__get__`和`__set__`切入动态属性或方法

## 举例：Module Scope

为了让 IOC 容器的使用更加简洁和直观，VonaJS 推荐优先使用`依赖查找`策略，从而使用更少的装饰器函数，使用更少的类型标注。通过 Module `Scope`对象访问模块提供的资源，就是践行`依赖查找策略`的机制之一

- 参见: [模块Scope](../../essentials/scope/introduction.md)

比如，模块 demo-student 中有一个 model `student`，用于 crud 操作。可以这样使用 model：

``` typescript
import { ModelStudent } from '../model/student.ts';

async findMany(params) {
  const model = this.bean._getBean(ModelStudent);
  return await model.selectAndCount(params);
}
```

使用魔术方法：

``` typescript
async findMany(params) {
  return await this.scope.model.student.selectAndCount(params);
}
```

- `this.scope.model.xxx`: 通过魔术方法动态获取当前模块中的 model 实例

## 举例：CRUD(魔术方法)

Vona ORM 采用魔术方法的机制进一步简化操作数据的代码

- 参见: [CRUD(魔术方法)](../../techniques/orm/crud-magic.md)

比如，通过字段`id`查询学生信息，代码如下：

``` typescript
async findOne(id) {
  return await this.scope.model.student.get({ id });
}
```

使用魔术方法：

``` typescript
async findOne(id) {
  return await this.scope.model.student.getById(id);
}
```

- 系统自动从 method name `getById`中解析出参数`id`，然后调用实际的 CRUD 方法，这里就是: `get({ id })`