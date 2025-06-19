# 参数校验  

Vona 基于[Zod](https://zod.dev) 提供了非常简洁、灵活的机制对请求参数作校验

## 1. 自动推断Zod Schema：基础类型/Dto/Entity

如果参数类型是`基础类型/Dto/Entity`，那么，系统就会自动推断出对应的 Zod Schema，从而进行校验

比如，`findOne(@Arg.query('id') id: number)`，id 的类型是`number`，那么自动推断出来的 Schema 就是：`z.number()`

再比如，`findOne(@Arg.query() query: DtoStudentInfo)`，query 的类型是 Dto: `DtoStudentInfo`，那么自动推断出来的 Schema 就是：`z.object({...})`

* 可自动推断的类型清单

|名称|说明|
|--|--|
|string|z.string()|
|number|z.number()|
|boolean|z.boolean()|
|Dto|z.object({...})|
|Entity|z.object({...})|

## 2. 指定Zod Schema

我们还可以显式的指定 Zod Schema，从而提供更加复杂的校验规则。比如，URL 为`/?id=1`，我们要求 id 为`number`，并且`>=6`。那么，我们可以给 query 传入参数：`z.number().min(6)`

``` typescript
import z from 'zod';

class ControllerStudent3 {
  @Web.get()
  findOne(@Arg.query('id', z.number().min(6)) id: number) {}
}
```

## 3. 扩展Zod Schema的属性

我们还可以在现有的 Zod Schema 基础之上扩展新的属性

比如，我们要指定 id 为`number`，并且是`可选`，默认值为`3`

``` typescript
import { v } from 'vona-module-a-openapi';

class ControllerStudent3 {
  @Web.get()
  findOne(@Arg.query('id', v.default(3), v.optional()) id: number) {}
}
```

首先，系统自动推断出 schema 为`z.number()`，然后，依次附加`optional`和`default`属性，最终会生成 schema：`z.number().optional().default(3)`

因此，上述代码等价于：

``` typescript
class ControllerStudent3 {
  @Web.get()
  findOne(@Arg.query('id', z.number().optional().default(3)) id: number) {}
}
```

也等价于：

``` typescript
class ControllerStudent3 {
  @Web.get()
  findOne(@Arg.query('id', v.default(3), z.number().optional()) id: number) {}
}
```

## 4. 特殊工具：Array

对于 Array 类型的参数，Vona 也提供了便利的工具。比如，我们要求 ids 为`number[]`：

``` typescript
class ControllerStudent3 {
  @Web.get()
  findOne(@Arg.query('ids', v.array(Number)) ids: number[]) {}
}
```

等价于：

``` typescript
class ControllerStudent3 {
  @Web.get()
  findOne(@Arg.query('ids', v.array(z.number())) ids: number[]) {}
}
```

再比如，我们从 Request body 获取 students 数组，类型为`DtoStudentInfo[]`：

``` typescript
class ControllerStudent3 {
  @Web.post()
  update(@Arg.body('students', v.array(DtoStudentInfo)) students: DtoStudentInfo[]) {}
}
```

这些用于扩展 Zod Schema 的工具方法都放入分组`v`中，从而减轻心智负担

## `v`工具清单

|名称|说明|
|--|--|
|v.array|array|
|v.default|default|
|v.object|object|
|v.optional|optional|
|v.email|email|
|v.url|url|
|v.uuid|uuid|
|v.ip|ip|
|v.min|min|
|v.max|max|
|v.tableIdentity|tableIdentity|
|v.openapi|openapi|
|v.title|title|
|v.description|description|
|v.example|example|
