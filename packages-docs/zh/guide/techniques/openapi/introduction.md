# Swagger/OpenAPI

Vona 基于[@asteasolutions/zod-to-openapi](https://github.com/asteasolutions/zod-to-openapi)实现了非常便利的 Swagger/OpenAPI。Vona 中的 OpenAPI 仍然延续[参数校验](../validation/introduction.md)中的装饰器，同时提供扩展工具，用于设置与 OpenAPI 相关的元数据

## 1. 自动推断Zod Schema：基础类型/Dto/Entity

如果参数类型是`基础类型/Dto/Entity`，那么，系统就会自动推断出对应的 Zod Schema，从而自动生成 OpenAPI 元数据

比如，`findOne(@Arg.query('id') id: number)`，id 的类型是`number`，那么自动推断出来的 Schema 就是：`z.number()`。那么，自动生成的 Swagger/OpenAPI 如下：

![](../../../assets/img/openapi/openapi-1.png)

再比如，`findOne(@Arg.query() query: DtoStudentInfo)`，query 的类型是 Dto: `DtoStudentInfo`，那么自动推断出来的 Schema 就是：`z.object({...})`。那么，自动生成的 Swagger/OpenAPI 如下：

![](../../../assets/img/openapi/openapi-2.png)

## 2. 指定Zod Schema

比如，`findOne(@Arg.query('id', z.number().min(6)) id: number)`，我们指定 id 的类型是`number`，并且`>=6`。那么，自动生成的 Swagger/OpenAPI 如下：

![](../../../assets/img/openapi/openapi-3.png)

## 3. 扩展Zod Schema的属性

比如，`findOne(@Arg.query('id', v.default(3), v.optional()) id: number)`。首先，系统自动推断出 schema 为`z.number()`，然后，依次附加`optional`和`default`属性，最终会生成 schema：`z.number().optional().default(3)`。那么，自动生成的 Swagger/OpenAPI 如下：

![](../../../assets/img/openapi/openapi-4.png)

## 4. 特殊工具：Array

比如，`findOne(@Arg.query('id', v.array(Number)) id: number)`，我们指定 ids 为`number[]`首先，系统自动推断出 schema 为`z.number()`，然后，依次附加`optional`和`default`属性，最终会生成 schema：`z.number().optional().default(3)`。那么，自动生成的 Swagger/OpenAPI 如下：

![](../../../assets/img/openapi/openapi-4.png)