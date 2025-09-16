# $Dto.query/DtoQueryBase

`$Dto.query/DtoQueryBase` is used to annotate the `Query` parameters

## Usage of DtoQueryBase

### 1. Create DTO

In VSCode, use the `Vona Create/Dto` context menu to create a DTO code skeleton:

``` typescript
@Dto()
export class DtoOrderQuery {}
```

### 2. Inherit DtoQueryBase

``` typescript
@Dto()
export class DtoOrderQuery extends DtoQueryBase {}
```

## DtoQueryBase Fields

Since `DtoOrderQuery` inherits from `DtoQueryBase`, it has the following member fields:

|Name|Description|Example|
|--|--|--|
|columns|List of fields to query|`*`, `id,orderNo,remark`, `["id","orderNo","remark"]`|
|where|Query clause|`{ "orderNo": { "_include_":  "order001" } }`|
|orders|Sorting|`orderNo,desc`, `[["orderNo", "desc"], ["createdAt", "desc"]]`|

## Annotating Query Parameters

Still taking the `findAll` method of the `Order` controller as an example, we can annotate the Query parameters:

``` diff
+ import type { IQueryParams } from 'vona-module-a-orm';
+ import { Arg } from 'vona-module-a-web';

class ControllerOrder extends BeanBase {
  @Web.get('findAll')
  @Api.body(v.array(DtoOrderResult))
  async findAll(
+   @Arg.queryPro(DtoOrderQuery) params: IQueryParams<ModelOrder>,
  ): Promise<DtoOrderResult[]> {
    return this.scope.model.order.select({
+     ...params,
      include: {
        products: true,
      },
    });
  }
}
```

- `@Arg.queryPro`: This Pipe transforms the Query parameter and needs to pass in the parameter `DtoOrderQuery`
- `IQueryParams`: The data type obtained by Pipe transforming the Query parameter is `IQueryParams`, and the generic parameter `ModelOrder` needs to be passed in to match the parameter type of the `model.order.select` method

The automatically generated Swagger/Openapi is as follows:

![](../../../../assets/img/orm/dto/dto-2.png)

## $Dto.query

如果需要在 DTO 中添加业务字段的查询条件，可以使用`$Dto.query`

``` diff
@Dto()
export class DtoOrderQuery
+ extends $Dto.query(EntityOrder, ['orderNo', 'remark']) {}
```

- `$Dto.query`：自动从`EntityOrder`中提取字段`orderNo/remark`，然后与`DtoQueryBase`成员字段进行合并

基于`DtoOrderQuery`生成的 Swagger/Openapi 效果如下：

![](../../../../assets/img/orm/dto/dto-3.png)

## 添加自定义字段

还可以直接在 DTO 中添加自定义字段

``` diff
@Dto()
export class DtoOrderQuery
+ extends $Dto.query(EntityOrder, ['remark']) {
+ @Api.field(v.optional())
+ orderNo?: string;
}
```

- 从`EntityOrder`中自动提取字段`remark`
- 添加自定义字段`orderNo`

## Openapi参数

我们还可以指定 Openapi 参数，从而支持更多能力

### 1. relations

比如，Model Order 与 Model User 是`n:1`的关系，我们可以在 Query 参数中传入`userName`作为查询条件。那么，需要在 DTO 中添加`userName`字段，并且设置 Openapi 参数

``` typescript
@Dto()
export class DtoOrderQuery
  extends $Dto.query(EntityOrder, ['orderNo', 'remark']) {
  @Api.field(v.optional(), v.openapi({
    query: {
      table: $tableName(EntityUser),
      joinType: 'innerJoin',
      joinOn: ['userId', 'testVonaUser.id'],
      originalName: 'name',
    },
  }))
  userName?: string;
}
```

|名称|说明|
|--|--|
|table|关联表名|
|joinType|关联类型，默认为`innerJoin`|
|joinOn|关联条件|
|originalName|原始字段名|

基于`DtoOrderQuery`生成的 Swagger/Openapi 效果如下：

![](../../../../assets/img/orm/dto/dto-4.png)

### 2. 基于relations的orders

当 Model Order 与 Model User 进行联合查询时，`orders`中的字段如果在两个数据表中都存在，那么就必须明确指定表名前缀。比如：`testVonaOrder.createdAt,desc`

Vona ORM 内置了基于 relations 的 orders 处理逻辑，只需要在 DTO 中设置 Openapi 参数即可：

``` diff
@Dto<IDtoOptionsOrderQuery>({
+ openapi: {
+   query: {
+     table: $tableName(EntityOrder),
+   },
+ },
})
export class DtoOrderQuery
  extends $Dto.query(EntityOrder, ['orderNo', 'remark']) {
  @Api.field(v.optional(), v.openapi({
    query: {
      table: $tableName(EntityUser),
      joinType: 'innerJoin',
      joinOn: ['userId', 'testVonaUser.id'],
      originalName: 'name',
    },
  }))
  userName?: string;
}
```

## 自定义Query Transform

对于自定义字段，Vona ORM 提供了内置的 Transform 规则。比如：

- `orderNo`是 string 类型，系统自动转换为条件语句`'orderNo': { _includesI_: 'some input' }`
- `userName`也是 string 类型，系统自动转换为条件语句`'name': { _includesI_: 'some input' }`

为了支持更复杂的业务需求，可以提供自定义 Query Transform

### 1. 约定名称

比如，我们在 Controller Order 的`findAll`方法中使用 Query。那么，只需在当前 Controller 中提供`findAllQueryTransform`即可

``` diff
@Controller
class ControllerOrder {
+  findAllQueryTransform(_info: IPipeOptionsQueryTransformInfo): boolean | undefined {
+    return undefined;
+  }

  @Web.get('findAll')
  @Api.body(v.array(DtoOrderResult))
  async findAll(
    @Arg.queryPro(DtoOrderQuery) params: IQueryParams<ModelOrder>,
  ): Promise<DtoOrderResult[]> {
    return this.scope.model.order.select({
      ...params,
      include: {
        products: true,
      },
    });
  }
}
```

如果需要将`userName`转换为条件语句`'name': 'some input'`，那么代码如下：

``` typescript
class ControllerOrder {
  findAllQueryTransform(info: IPipeOptionsQueryTransformInfo): boolean | undefined {
    if (info.key === 'userName') {
      info.params.where[info.fullName] = info.value;
      return true;
    }
    return undefined;
  }
}  
```

### 2. Query Transform返回值

Query Transform 返回值如下：

|名称|说明|
|--|--|
|true|提供了自定义逻辑，忽略系统内置规则|
|false|没有提供自定义逻辑，忽略系统内置规则|
|undefined|没有提供自定义逻辑，使用系统内置规则|

### 2. 自定义名称

我们也可以为`Query Transform`提供自定义名称，比如：`myCustomQueryTransform`

``` diff
class ControllerOrder {
+ myCustomQueryTransform(info: IPipeOptionsQueryTransformInfo): boolean | undefined {
+   if (info.key === 'userName') {
+     info.params.where[info.fullName] = info.value;
+     return true;
+   }
+   return undefined;
+ }

  @Web.get('findAll')
  @Api.body(v.array(DtoOrderResult))
  async findAll(
+   @Arg.queryPro(DtoOrderQuery, 'myCustomQueryTransform') params: IQueryParams<ModelOrder>,
  ): Promise<DtoOrderResult[]> {
    return this.scope.model.order.select({
      ...params,
      include: {
        products: true,
      },
    });
  }
}
```

- `@Arg.queryPro`：此 Pipe 对 Query 参数进行 transform，传入参数`'myCustomQueryTransform'`

### 3. 自定义函数

也可以直接为参数`transformFn`提供自定义函数：

``` diff
+ function myCustomQueryTransform(_ctx: VonaContext, info: IPipeOptionsQueryTransformInfo): boolean | undefined {
+   if (info.key === 'userName') {
+     info.params.where[info.fullName] = info.value;
+     return true;
+   }
+   return undefined;
+ }

class ControllerOrder {
  @Web.get('findAll')
  @Api.body(v.array(DtoOrderResult))
  async findAll(
+   @Arg.queryPro(DtoOrderQuery, myCustomQueryTransform) params: IQueryParams<ModelOrder>,
  ): Promise<DtoOrderResult[]> {
    return this.scope.model.order.select({
      ...params,
      include: {
        products: true,
      },
    });
  }
}
```
