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
  findOne(@Arg.query('id') id: number) {}
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

- 参见：[参数校验](../../techniques/validation/introduction.md)

## Swagger/OpenAPI

Vona 基于[@asteasolutions/zod-to-openapi](https://github.com/asteasolutions/zod-to-openapi)实现了非常便利的`Swagger/OpenAPI`。Vona 中的 `Swagger/OpenAPI` 仍然延续[参数校验](../../techniques/validation/introduction.md)中的装饰器，同时提供扩展工具，用于设置与 OpenAPI 相关的信息

- 参见：[Swagger/OpenAPI](../../techniques/openapi/introduction.md)

## Response Body

Vona 提供了与[参数校验](../../techniques/validation/introduction.md)类似的机制，指定 Response body 的类型，并自动生成 Swagger/OpenAPI 元数据

### 1. 自动推断Zod Schema：基础类型/Dto/Entity

如果 body 类型是`基础类型/Dto/Entity`，那么，系统就会自动推断出对应的 Zod Schema，并自动生成 Swagger/OpenAPI

* 举例：`string`

``` typescript{3}
class ControllerStudent {
  @Web.get()
  findOne(): string {
    return 'Tom';
  }
}  
```

![](../../../assets/img/openapi/openapi-10.png)

* 举例：`EntityStudent`

``` typescript{3}
class ControllerStudent {
  @Web.get()
  findOne(): EntityStudent {
    return {} as EntityStudent;
  }
}  
```

![](../../../assets/img/openapi/openapi-11.png)

* 可自动推断的类型清单

|名称|说明|
|--|--|
|string|z.string()|
|number|z.number()|
|boolean|z.boolean()|
|Dto|z.object({...})|
|Entity|z.object({...})|

### 2. 指定Zod Schema

我们还可以显式的指定 Zod Schema，并自动生成 Swagger/OpenAPI

* 举例：`string[]`

使用装饰器`@Api.body`指定 Zod Schema。Zod Schema 的使用规则与[参数校验](../../techniques/validation/introduction.md)一致

``` typescript{5}
import { Api } from 'vona-module-a-openapi';

class ControllerStudent {
  @Web.get()
  @Api.body(v.array(String))
  findOne(): string[] {
    return ['Tom'];
  }
}  
```

![](../../../assets/img/openapi/openapi-12.png)

* 举例：`Promise<EntityStudent>`

``` typescript{3}
class ControllerStudent {
  @Web.get()
  @Api.body(EntityStudent)
  async findOne(): Promise<EntityStudent> {
    return {} as EntityStudent;
  }
}  
```

![](../../../assets/img/openapi/openapi-13.png)

## Response Body包装对象

在默认情况下，Vona 自动为 Response body 提供一个包装对象。比如，我们要返回 string 类型的 body，那么实际返回的数据类型是：

``` typescript
{
  code: string;
  message: string;
  data: string;
}
```

我们还可以使用装饰器`@Api.bodyCustom`来自定义包装对象

### 1. 禁用包装对象

可以禁用包装对象，直接返回 Response body 本身

``` typescript{3}
class ControllerStudent {
  @Web.get()
  @Api.bodyCustom(false)
  findOne(): string {
    return 'Tom';
  }
}  
```

![](../../../assets/img/openapi/openapi-14.png)

### 2. 提供自定义包装对象

* 首先，定义包装函数：

``` typescript
export function bodySchemaWrapperCustom(bodySchema: any) {
  return z.object({
    status: z.number(),
    msg: z.string(),
    data: bodySchema,
  });
}
```

* 然后将包装函数`bodySchemaWrapperCustom`传入装饰器`@Api.bodyCustom`

``` typescript{3}
class ControllerStudent {
  @Web.get()
  @Api.bodyCustom(bodySchemaWrapperCustom)
  findOne(): string {
    return 'Tom';
  }
}  
```

![](../../../assets/img/openapi/openapi-15.png)

* 如果 Response body 的类型是`Promise<EntityStudent>`，那么代码如下：

``` typescript{3}
class ControllerStudent {
  @Web.get()
  @Api.bodyCustom(bodySchemaWrapperCustom, EntityStudent)
  async findOne(): Promise<EntityStudent> {
    return {} as EntityStudent;
  }
}  
```

![](../../../assets/img/openapi/openapi-16.png)
