# 工具函数

VonaJS 提供了一组工具函数，可以更加便利的使用序列化能力

## 工具清单

|工具: @Serializer|工具: v|说明|
|--|--|--|
|@Serializer.exclude|v.serializerExclude|排除字段|
|@Serializer.transform|v.serializerTransform|使用[SerializerTransform](./introduction.md)|
|@Serializer.replace|v.serializerReplace|对字段值进行脱敏处理|
|@Serializer.getter|v.serializerGetter|采用getter机制生成新的字段值|
|@Serializer.custom|v.serializerCustom|使用自定义函数对字段值进行处理|

::: tip
既然`@Serializer`工具非常简洁，直观，为什么还要提供`v`工具？

1. `v`工具可以实现通过 App Config 修改配置
2. `v`工具和`@Serializer`工具底层逻辑是一致的
:::

## @Serializer.exclude/v.serializerExclude

比如，排除`EntityStudent`中的`name`字段

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

* 方法 1: 直接修改 Openapi 参数

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

* 方法 2: 构造一个新的 schema

``` typescript
import { $makeSchema, v } from 'vona-module-a-openapi';

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

## @Serializer.transform/v.serializerTransform

比如，将`EntityStudent`中的`name`字段值转化为大写

我们直接使用[序列化](./introduction.md)中创建的 SerializerTransform `upper`

### 1. @Serializer.transform

``` diff
class EntityStudent {
+ @Serializer.transform('demo-student:upper')
  @Api.field(v.title($locale('Name')))
  name: string;
}
```

### 2. v.serializerTransform

``` diff
class EntityStudent {
+ @Api.field(v.serializerTransform('demo-student:upper'), v.title($locale('Name')))
  name: string;
}
```

### 3. App Config

可以在 App Config 中修改配置

`src/backend/config/config/config.ts`

* 方法 1: 直接修改 Openapi 参数

``` typescript
// onions
config.onions = {
  entity: {
    'demo-student:student': {
      fields: {
        name: {
          serializerTransforms: {
            'demo-student:upper': {},
          },
        },
      },
    },
  },
};
```

* 方法 2: 构造一个新的 schema

``` typescript
import { $makeSchema, v } from 'vona-module-a-openapi';

// onions
config.onions = {
  entity: {
    'demo-student:student': {
      fields: {
        name: $makeSchema(v.serializerTransform('demo-student:upper'), z.string()),
      },
    },
  },
};
```


## @Serializer.replace/v.serializerReplace

比如，将`EntityStudent`中的`name`字段值进行脱敏处理

比如，name 原始值为`tom`，脱敏之后为`t***m`

### 1. @Serializer.replace

``` diff
class EntityStudent {
+ @Serializer.replace({ patternFrom: /(\w)(\w+)(\w)/, patternTo: '$1***$3' })
  @Api.field(v.title($locale('Name')))
  name: string;
}
```

### 2. v.serializerReplace

``` diff
class EntityStudent {
  @Api.field(
+   v.serializerReplace({ patternFrom: /(\w)(\w+)(\w)/, patternTo: '$1***$3' }),
    v.title($locale('Name')),
  )
  name: string;
}
```

### 3. App Config

可以在 App Config 中修改配置

`src/backend/config/config/config.ts`

* 方法 1: 直接修改 Openapi 参数

``` typescript
// onions
config.onions = {
  entity: {
    'demo-student:student': {
      fields: {
        name: {
          serializerTransforms: {
            'a-serialization:replace': {
              patternFrom: /(\w)(\w+)(\w)/,
              patternTo: '$1***$3',
            },
          },
        },
      },
    },
  },
};
```

- `a-serialization:replace`: `a-serialization`模块提供的 SerializerTransform

* 方法 2: 构造一个新的 schema

``` typescript
import { $makeSchema, v } from 'vona-module-a-openapi';

// onions
config.onions = {
  entity: {
    'demo-student:student': {
      fields: {
        name: $makeSchema(
          v.serializerReplace({ patternFrom: /(\w)(\w+)(\w)/, patternTo: '$1***$3' }),
          z.string(),
        ),
      },
    },
  },
};
```
