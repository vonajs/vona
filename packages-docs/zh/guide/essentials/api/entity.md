# Entity

## 创建Entity

比如，我们在模块 demo-student 中创建一个 Entity: `student`

### 1. Cli命令

``` bash
$ vona :create:bean entity student --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Create/Entity`
:::

## Entity定义

``` typescript
@Entity<IEntityOptionsStudent>('demoStudent')
export class EntityStudent extends EntityBase {}
```

- 继承自 EntityBase 基类
- 使用 Entity 装饰器
- 设置对应的数据表名

## @Api.field

一般而言，在定义字段时，需要指定字段的类型、验证规则、Swagger/Openapi 元数据

在 Entity 中只需要使用`@Api.field`装饰器即可提供以上所有信息，从而让代码更加简洁、直观

`@Api.field`装饰器的参数使用机制，与 Controller 请求参数类似，参见：
  - [参数校验](../../techniques/validation/introduction.md)
  - [Swagger/Openapi](../../techniques/openapi/introduction.md)

## 字段类型与验证规则

### 1. 自动推断Zod Schema：基础类型/Dto/Entity

如果 body 类型是`基础类型/Dto/Entity`，那么，系统就会自动推断出对应的 Zod Schema，并自动生成 Swagger/Openapi

* 举例：`string`

``` typescript
class EntityStudent {
  @Api.field()
  name: string;
}  
```

![](../../../assets/img/openapi/openapi-17.png)

* 举例：`EntityBook`

``` typescript
class EntityStudent {
  @Api.field()
  book: EntityBook;
}
```

![](../../../assets/img/openapi/openapi-18.png)

* 可自动推断的类型清单

|名称|说明|
|--|--|
|string|z.string()|
|number|z.number()|
|boolean|z.boolean()|
|Dto|z.object({...})|
|Entity|z.object({...})|

### 2. 指定Zod Schema

我们还可以显式的指定 Zod Schema，并自动生成 Swagger/Openapi

* 举例：`number，>=18`

``` typescript
class EntityStudent {
  @Api.field(z.number().min(18))
  age: number;
}
```

![](../../../assets/img/openapi/openapi-19.png)

### 3. 扩展Zod Schema的属性

我们还可以在现有的 Zod Schema 基础之上扩展新的属性

* 举例：`number，可选，默认值为18`

``` typescript
class EntityStudent {
  @Api.field(v.default(18), v.optional())
  age?: number;
}
```

上述代码等价于：

``` typescript
class EntityStudent {
  @Api.field(z.number().optional().default(18))
  age?: number;
}
```

也等价于：

``` typescript
class EntityStudent {
  @Api.field(v.default(18), z.number().optional())
  age?: number;
}
```

![](../../../assets/img/openapi/openapi-20.png)

### 4. 特殊工具：Array

对于 Array 类型的参数，Vona 也提供了便利的工具

* 举例：`number[]`

``` typescript
class EntityStudent {
  @Api.field(v.array(Number))
  bookIds: number[];
}
```

等价于：

``` typescript
class EntityStudent {
  @Api.field(v.array(z.number()))
  bookIds: number[];
}
```

![](../../../assets/img/openapi/openapi-21.png)

* 举例：`EntityBook[]`

``` typescript
class EntityStudent {
  @Api.field(v.array(EntityBook))
  books: EntityBook[];
}
```

![](../../../assets/img/openapi/openapi-22.png)

这些用于扩展 Zod Schema 的工具方法都放入装饰器分组`v`中，从而减轻心智负担

## Swagger/Openapi

Vona 还提供了许多扩展工具，用于设置与 Openapi 相关的元数据