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
$ vona :create:bean filterTransform upper --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Bean/Filter Transform`
:::

## Serializer Transform定义

``` typescript
export type TypeSerializerTransformUpperValue = string;

export type TypeSerializerTransformUpperData = unknown;

export type TypeSerializerTransformUpperResult = TypeSerializerTransformUpperValue;

export interface ISerializerTransformOptionsUpper extends IDecoratorSerializerTransformOptions {}

@SerializerTransform<ISerializerTransformOptionsUpper>()
export class SerializerTransformUpper extends BeanBase {
  async transform(
    value: TypeSerializerTransformUpperValue,
    _data: TypeSerializerTransformUpperData,
    _options: ISerializerTransformOptionsUpper,
  ): Promise<TypeSerializerTransformUpperResult> {
    return value.toUpperCase();
  }
}
```

- `TypeSerializerTransformUpperValue`: 定义字段类型
- `TypeSerializerTransformUpperData`: 定义外层 object 对象类型
- `TypeSerializerTransformUpperResult`: 定义结果类型
- `transform`: 将字段值转为大写

