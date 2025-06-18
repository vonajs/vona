# Controller

## 创建Controller

比如，我们在模块 demo-student 中创建一个 Controller: `student`

### 1. Cli命令

``` bash
$ vona :create:bean controller student --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Create/Controller`
:::

## Controller定义

``` typescript{1,3}
@Controller<IControllerOptionsStudent>('student')
export class ControllerStudent extends BeanBase {
  @Web.post('')
  @Api.body(v.object(EntityStudent))
  async create(@Arg.body() student: DtoStudentCreate): Promise<EntityStudent> {
    return await this.scope.service.student.create(student);
  }
}
```

- Controller Path: `'student'`
- Action Path : `''`

## 路由

与`Fastify`一样，Vona 也采用[find-my-way](https://github.com/delvedor/find-my-way)作为路由库。所有使用了`@Web`装饰器的 Controller Action，会自动注册到路由表中

路由路径由 Controller Path 和 Action Path 组合而成

### 常规格式

``` bash
Route Path = GlobalPrefix + Module Url + Controller Path + Action Path
```

- GlobalPrefix: 项目配置：`app.config.server.globalPrefix`，默认为`/api`
- Module Url: 通过模块名称生成的 Url 片段。比如，模块 demo-student 的 module Url 就是`demo/student`

比如，模块 demo-student 中的 Controller `teacher`，路由如下：

|Controller Path|Action Path| Route Path|
|--|--|--|
|teacher|empty|/api/demo/student/teacher|
|teacher|:id|/api/demo/student/teacher/:id|

### 简化规则1

如果 Controller Path 与模块名称重名，那么自动去除重复部分

比如，模块 demo-student 中的 Controller `student`，路由如下：

|Controller Path|Action Path| Route Path|
|--|--|--|
|student|empty|/api/demo/student|
|student|:id|/api/demo/student/:id|

### 简化规则2

如果 Controller Path 或者 Action Path 以`/`为前缀，那么就自动去除 Module Url

|Controller Path|Action Path| Route Path|
|--|--|--|
|/student|empty|/api/student|
|/student|:id|/api/student/:id|

### 简化规则3

如果 Controller Path 或者 Action Path 以`//`为前缀，那么就自动去除 GlobalPrefix 和 Module Url

|Controller Path|Action Path| Route Path|
|--|--|--|
|//student|empty|/student|
|//student|:id|/student/:id|

再比如，项目的首页，路由如下：

|Controller Path|Action Path| Route Path|
|--|--|--|
|any value|//|/|

## 请求方法

Vona 使用装饰器来定义请求方法。这些装饰器都放入一个分组`@Web`中。因为装饰器比较多，采用分组的机制，可以减轻心智负担。比如：我们为 create 设置一个 post 方法：

``` typescript
import { Web } from 'vona-module-a-web';

class ControllerStudent {
  @Web.post()
  async create() {}
}  
```

* Method 装饰器清单

|名称|说明|
|--|--|
|@Web.post|post|
|@Web.get|get|
|@Web.delete|delete|
|@Web.put|put|
|@Web.patch|patch|
|@Web.options|options|
|@Web.head|head|

## 请求参数

我们需要从请求中取得各种参数，比如 Query、Params、Body、Headers，等等。同样，Vona 也提供了许多装饰器用于获取参数。我们也将所有参数装饰器放入分组`@Arg`中，从而减轻心智负担。比如，我们要获取某位学生的数据，请求的 URL 为`/?id=1`：

``` typescript
class ControllerStudent3 {
  @Web.get()
  findOne(@Arg.query('id') id: number) {
  }
}
```

根据参数的特点，不同类型的参数允许指定字段名称，比如在 query 装饰器中指定`id`。我们也可以不指定字段名称，从而取得整个 query 对象。

比如，URL 为`/?id=1&name=tom`:

``` typescript
class DtoStudentInfo {
  id: number;
  name: string;
}

class ControllerStudent3 {
  @Web.get()
  findOne(@Arg.query() query: DtoStudentInfo) {
    console.log(query.id, query.name);
  }
}
```

* 参数装饰器清单

|名称|说明|
|--|--|
|@Arg.param|Param|
|@Arg.query|Query|
|@Arg.body|Body|
|@Arg.headers|Headers|
|@Arg.fields|Fields|
|@Arg.field|Field|
|@Arg.files|Files|
|@Arg.file|File|
|@Arg.user|The current user|

## 参数校验  

Vona 基于[Zod](https://zod.dev) 提供了非常简洁、灵活的机制对请求参数作校验

### 1. 自动推断Zod Schema：基础类型/Dto/Entity

如果参数类型是`基础类型/Dto/Entity`，那么，系统就会自动推断出对应的 Zod Schema，从而进行校验

比如，`findOne(@Arg.query('id') id: string)`，id 的类型是`string`，那么自动推断出来的 Schema 就是：`z.string()`

再比如，`findOne(@Arg.query() query: DtoStudentInfo)`，query 的类型是 Dto: `DtoStudentInfo`，那么自动推断出来的 Schema 就是：`z.object({...})`

* 可自动推断的类型清单

|名称|说明|
|--|--|
|string|z.string()|
|number|z.number()|
|boolean|z.boolean()|
|Dto|z.object({...})|
|Entity|z.object({...})|

### 2. 指定Zod Schema

我们还可以显式的指定 Zod Schema，从而提供更加复杂的校验规则。比如，URL 为`/?id=1`，我们要求 id 为 number，并且>=6。那么，我们可以给 query 传入参数：`z.number().min(6)`

``` typescript
import z from 'zod';

class ControllerStudent3 {
  @Web.get()
  findOne(@Arg.query('id', z.number().min(6)) id: number) {
  }
}
```

### 3. 扩展Zod Schema的属性：optional/default/openapi

我们还可以在现有的 Zod Schema 基础之上扩展新的属性

比如，我们要指定 id 为`number`，并且是`可选`，默认值为`3`

``` typescript
import { v } from 'vona-module-a-openapi';

class ControllerStudent3 {
  @Web.get()
  findOne(@Arg.query('id', v.default(3), v.optional()) id: number) {
  }
}
```

首先，系统自动推断出 schema 为`z.number()`，然后，依次附加`optional`和`default`属性，最终会生成 schema：`z.number().optional.default(3)`

因此，上述代码等价于：

``` typescript
class ControllerStudent3 {
  @Web.get()
  findOne(@Arg.query('id', z.number().optional().default(3)) id: number) {
  }
}
```

也等价于：

``` typescript
class ControllerStudent3 {
  @Web.get()
  findOne(@Arg.query('id', v.default(3), z.number().optional()) id: number) {
  }
}
```

### 4. 特殊工具：Array

对于 Array 类型的参数，Zova 也提供了便利的工具。比如，我们要求 ids 为 number[]：

``` typescript
class ControllerStudent3 {
  @Web.get()
  findOne(@Arg.query('id', v.array(Number)) id: number) {
  }
}
```

等价于：

``` typescript
class ControllerStudent3 {
  @Web.get()
  findOne(@Arg.query('id', v.array(z.number())) id: number) {
  }
}
```

再比如，我们从 Request body 获取 students 数组，类型为 DtoStudentInfo[]：

``` typescript
class ControllerStudent3 {
  @Web.post()
  update(@Arg.body('students', v.array(DtoStudentInfo)) students: DtoStudentInfo[]) {
  }
}
```

这些用于扩展 Zod Schema 的工具方法都放入分组`v`中，从而减轻心智负担

* `v`工具清单

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

## Response Body

