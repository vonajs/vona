# Filter Transform

对于自定义字段，Vona ORM 提供了内置的 Transform 规则。比如`DtoOrderQuery`：

- `orderNo`是 string 类型，系统自动转换为条件语句`'orderNo': { _includesI_: 'some input' }`
- `userName`也是 string 类型，系统自动转换为条件语句`'name': { _includesI_: 'some input' }`

为了支持更复杂的业务需求，可以提供自定义 Filter Transform

## 创建Filter Transform

比如，在模块 demo-student 中创建一个 Filter Transform: `dateRange`，将日期范围转换为条件语句

比如，当前时区为`Asia/Tokyo(+9:00)`。传入字段`createdAt`值为`2025-12-01~2025-12-02`，转换后的条件语句为:

``` typescript
createdAt >= '2025-11-30T15:00:00.000Z' and createdAt < '2025-12-02T15:00:00.000Z'
```

### 1. Cli命令

``` bash
$ vona :create:bean filterTransform dateRange --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Bean/Filter Transform`
:::

## Filter Transform定义

``` typescript
import { DateTime } from 'luxon';

export interface IFilterTransformOptionsDateRange extends IDecoratorFilterTransformOptions {}

@FilterTransform<IFilterTransformOptionsDateRange>()
export class FilterTransformDateRange extends BeanBase implements IFilterTransformWhere {
  async where(info: IPipeOptionsFilterTransformInfo, _options: IFilterTransformOptionsDateRange): Promise<boolean> {
    const { params, fullName, value } = info;
    const [dateStartStr, dateEndStr] = value.split('~');
    const dateStart = DateTime.fromISO(dateStartStr, { zone: this.ctx.tz });
    const dateEnd = DateTime.fromISO(dateEndStr, { zone: this.ctx.tz }).plus({ day: 1 });
    params.where[fullName] = {
      _gte_: dateStart.toJSDate(),
      _lt_: dateEnd.toJSDate(),
    };
    return true;
  }
}
```

- `IFilterTransformOptionsDateRange`: 定义 Filter Transform 参数
- `where`: 转换查询条件
- `this.ctx.tz`: 获取当前时区，比如`Asia/Tokyo`

`where`返回值：

|名称|说明|
|--|--|
|true|设置了查询条件|
|false|没有设置查询条件|

## 使用Filter Transform

### 1. Openapi

