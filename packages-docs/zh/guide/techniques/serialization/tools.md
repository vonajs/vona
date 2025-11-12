# 工具函数

VonaJS 提供了一组工具函数，可以更加便利的使用序列化能力

## 工具清单

|工具: @Serializer|工具: v|说明|
|--|--|--|
|@Serializer.exclude|v.serializerExclude|排除字段|
|@Serializer.transform|v.serializerTransform|使用[SerializerTransform](./introduction.md)|
|@Serializer.sensitive|v.serializerSensitive|对字段值进行脱敏处理|
|@Serializer.getter|v.serializerGetter|采用getter机制生成新的字段值|

## @Serializer.exclude/v.serializerExclude

排除`EntityStudent`中的`name`字段

### 1. @Serializer.exclude

``` diff
class EntityStudent {
+ @Serializer.exclude()
  @Api.field(v.title($locale('Name')), v.default(''), v.min(3))
  name: string;
}
```

### 2. v.serializerExclude

``` diff
class EntityStudent {
+ @Serializer.exclude()
  @Api.field(v.title($locale('Name')), v.default(''), v.min(3))
  name: string;
}
```

