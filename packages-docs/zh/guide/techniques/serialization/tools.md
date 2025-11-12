# 工具函数

VonaJS 提供了一组工具函数，可以更加便利的使用序列化能力

## 工具清单

|工具: @Serializer|工具: v|说明|
|--|--|--|
|@Serializer.exclude|v.serializerExclude|排除字段|
|@Serializer.transform|v.serializerTransform|使用[SerializerTransform](./introduction.md)|
|@Serializer.sensitive|v.serializerSensitive|对字段值进行脱敏处理|
|@Serializer.getter|v.serializerGetter|采用getter机制生成新的字段值|

::: tip
既然`@Serializer`工具非常简洁，直观，为什么还要提供`v`工具？

1. `v`工具可以实现通过 App Config 修改配置
2. `v`工具和`@Serializer`工具底层逻辑是一致的
:::

## @Serializer.exclude/v.serializerExclude

排除`EntityStudent`中的`name`字段

### 1. @Serializer.exclude

``` diff
class EntityStudent {
+ @Serializer.exclude()
  @Api.field(v.title($locale('Name')))
  name: string;
}
```

### 2. v.serializerExclude

``` diff
class EntityStudent {
+ @Api.field(v.serializerExclude(), v.title($locale('Name')))
  name: string;
}
```

### 3. App Config

可以在 App Config 中修改配置

`src/backend/config/config/config.ts`

* 直接修改 Openapi 参数

``` typescript
// onions
config.onions = {
  entity: {
    'demo-student:student': {
      fields: {
        name: { exclude: false },
      },
    },
  },
};
```

* 构造一个新的 schema

``` typescript
// onions
config.onions = {
  entity: {
    'demo-student:student': {
      fields: {
        name: $makeSchema(v.serializerExclude(), z.string()),
      },
    },
  },
};
```
