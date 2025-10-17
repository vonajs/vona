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

## 4. Decorator: @Arg.queryPro

The decorator `@Arg.queryPro` supports more advanced query parameters, including `columns/where/orders/pageNo/pageSize`

- See:
  - [$Dto.query/DtoQueryBase](../orm/dto/query.md)
  - [$Dto.queryPage/DtoQueryPageBase](../orm/dto/query-page.md)

## 4. Tool: v.array

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

## Decorator List

|Name|Description|
|--|--|
|@Arg.param|从Request Params中取值|
|@Arg.query|从Request Query中取值|
|@Arg.body|从Request Body中取值|
|@Arg.headers|从Request Headers中取值|
|@Arg.fields|从Request Upload中取值|
|@Arg.field|从Request Upload中取值|
|@Arg.files|从Request Upload中取值|
|@Arg.file|从Request Upload中取值|
|@Arg.user|取得当前用户|
|@Arg.queryPro|从Request Query中取值|

## 工具清单

### 1. Basic Tools

|名称|说明|
|--|--|
|v.required|为`不允许为空`提供自定义错误消息，否则使用Zod内置的错误消息|
|v.optional|optional|
|v.default|default|
|v.object|object|
|v.strictObject|Same as `z.strictObject(schema.shape)`|
|v.looseObject|Same as `z.looseObject(schema.shape)`|
|v.array|array|
|v.lazy|创建Lazy Schema|

### 2. String Tools

|名称|说明|
|--|--|
|v.email|email|
|v.url|url|
|v.uuid|uuid|
|v.ipv4|ipv4|
|v.ipv6|ipv6|
|v.min|min，同时支持`string/number`|
|v.max|max，同时支持`string/number`|
|v.trim|trim|
|v.toLowerCase|toLowerCase|
|v.toUpperCase|toUpperCase|
|v.lowercase|lowercase|
|v.uppercase|uppercase|
|v.regex|regex|

### 3. Openapi Tools

|名称|说明|
|--|--|
|v.openapi|openapi|
|v.title|title|
|v.description|description|
|v.example|example|

### 4. Serializer Tools

|名称|说明|
|--|--|
|serializerExclude|排除字段|
|serializerTransform|转换字段值|
|serializerSensitive|脱敏处理|
|serializerGetter|使用Getter生成字段值|

### 5. Zod Tools

|名称|说明|
|--|--|
|v.refine|提供Zod Refine能力|
|v.transform|提供Zod Transform能力|

### 4. Special Tools

|名称|说明|
|--|--|
|v.tableIdentity|tableIdentity。基于当前系统配置，提供`number`或者`bigint`的校验规则|
|v.captcha|提供验证码选项|
