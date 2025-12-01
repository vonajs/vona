# Filter Transform

对于自定义字段，Vona ORM 提供了内置的 Transform 规则。比如`DtoOrderQuery`：

- `orderNo`是 string 类型，系统自动转换为条件语句`'orderNo': { _includesI_: 'some input' }`
- `userName`也是 string 类型，系统自动转换为条件语句`'name': { _includesI_: 'some input' }`

为了支持更复杂的业务需求，可以提供自定义 Filter Transform