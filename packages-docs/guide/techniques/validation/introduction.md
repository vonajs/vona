# Validation

Vona provides a very concise and flexible mechanism for verifying request parameters based on [Zod](https://zod.dev)

## 1. Automatically infer Zod Schema: Basic type/Dto/Entity

If the parameter type is `Basic type/Dto/Entity`, then the system will automatically infer the corresponding Zod Schema for verification

For example, `findOne(@Arg.query('id') id: number)`, the type of id is `number`, then the automatically inferred Schema is: `z.number()`

For another example, `findOne(@Arg.query() query: DtoStudentInfo)`, the type of query is Dto: `DtoStudentInfo`, then the automatically inferred Schema is: `z.object({...})`

* List of automatically inferred types

|Name|Description|
|--|--|
|string|z.string()|
|number|z.number()|
|boolean|z.boolean()|
|Dto|z.object({...})|
|Entity|z.object({...})|

## 2. Specify Zod Schema

We can also explicitly specify Zod Schema to provide more complex validation rules. For example, if the URL is `/?id=1`, we require id to be `number` and `>=6`. Then, we can pass parameters to query: `z.number().min(6)`

``` typescript
import z from 'zod';

class ControllerStudent3 {
  @Web.get()
  findOne(@Arg.query('id', z.number().min(6)) id: number) {}
}
```

## 3. Extending Zod Schema properties

We can also extend new properties based on the existing Zod Schema

For example, we want to specify id as `number`, and it is `optional`, with a default value of `3`

``` typescript
import { v } from 'vona-module-a-openapi';

class ControllerStudent3 {
  @Web.get()
  findOne(@Arg.query('id', v.default(3), v.optional()) id: number) {}
}
```

First, the system automatically infers the schema For `z.number()`, then, append the `optional` and `default` attributes in sequence, and finally generate the schema: `z.number().optional().default(3)`

Therefore, the above code is equivalent to:

``` typescript
class ControllerStudent3 {
  @Web.get()
  findOne(@Arg.query('id', z.number().optional().default(3)) id: number) {}
}
```

Also equivalent to:

``` typescript
class ControllerStudent3 {
  @Web.get()
  findOne(@Arg.query('id', v.default(3), z.number().optional()) id: number) {}
}
```

## 4. Special tool: Array

For Array type parameters, Vona also provides convenient tools. For example, we require `ids` to be `number[]`:

``` typescript
class ControllerStudent3 {
  @Web.get()
  findOne(@Arg.query('ids', v.array(Number)) ids: number[]) {}
}
```

Equivalent to:

``` typescript
class ControllerStudent3 {
  @Web.get()
  findOne(@Arg.query('ids', v.array(z.number())) ids: number[]) {}
}
```

For another example, we get the students array from the Request body, which is of type `DtoStudentInfo[]`:

``` typescript
class ControllerStudent3 {
  @Web.post()
  update(@Arg.body('students', v.array(DtoStudentInfo)) students: DtoStudentInfo[]) {}
}
```

These utility methods for extending Zod Schema are grouped into `v` to reduce the mental burden

## `v` tool list

|Name|Description|
|--|--|
|@v.array|array|
|@v.default|default|
|@v.object|object|
|@v.optional|optional|
|@v.email|email|
|@v.url|url|
|@v.uuid|uuid|
|@v.ip|ip|
|@v.min|min|
|@v.max|max|
|@v.tableIdentity|tableIdentity|
|@v.openapi|openapi|
|@v.title|title|
|@v.description|description|
|@v.example|example|
