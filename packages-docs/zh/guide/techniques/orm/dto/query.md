# $Dto.query/DtoQueryBase

`$Dto.query/DtoQueryBase`用于标注 Query 参数

## DtoQueryBase的用法

### 1. 创建DTO

在 VSCode 中，可以通过右键菜单`Vona Create/Dto`创建 DTO 的代码骨架：

``` typescript
@Dto()
export class DtoOrderQuery {}
```

### 2. 继承DtoQueryBase

``` typescript
@Dto()
export class DtoOrderQuery extends DtoQueryBase {}
```

## DtoQueryBase成员字段

由于`DtoOrderQuery`继承自`DtoQueryBase`，因此，有以下成员字段：

|名称|说明|
|--|--|
|columns|要查询的字段清单|
|where|条件语句|
|orders|排序|

## 标注Query参数

仍以 Controller Order 的 findAll 方法为例，标注 Query 参数：

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

- `@Arg.queryPro`：对 Query 参数进行 transform 的 Pipe，需要传入参数`DtoOrderQuery`
- `IQueryParams`: Pipe 对 Query 参数进行 transform 后的数据类型为`IQueryParams`，需要传入泛型参数`ModelOrder`，从而与`model.order.select`方法的参数类型相匹配

