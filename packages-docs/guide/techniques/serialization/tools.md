# Utility Functions

VonaJS provides a set of utility functions to make serialization capabilities more convenient

## Utility List

|Tool: @Serializer|Tool: v|Description|

|--|--|--|

|@Serializer.transform|v.serializerTransform|For using Serializer Transform, see: [Serialization](./introduction.md)|

|@Serializer.exclude|v.serializerExclude|Exclude fields|

|@Serializer.replace|v.serializerReplace|De-identify field values|

|@Serializer.getter|v.serializerGetter|Generate new field values ​​using getter mechanisms|

|@Serializer.custom|v.serializerCustom|Process field values ​​using custom functions|

::: tip Since the `@Serializer` utility is very concise and intuitive, why provide the `v` utility?

1. The `v` tool allows modification of configurations via App Config.

2. The underlying logic of the `v` tool and the `@Serializer` tool is consistent.

:::

## @Serializer.transform/v.serializerTransform

For example, to convert the `name` field value in `EntityStudent` to uppercase,

we directly use the Serializer Transform `upper` created in [Serialization](./introduction.md).

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

Configuration can be modified in App Config

`src/backend/config/config/config.ts`

* Method 1: Directly modify Openapi parameters

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

},

};

```

* Method 2: Construct a new schema

``` typescript

import { $makeSchema, v } from 'vona-module-a-openapi';

// onions

config.onions = {

entity: { 'demo-student:student': { 
fields: { 
name: $makeSchema(v.serializerTransform('demo-student:upper'), z.string()), 
}, 
}, 
},
};
```

## @Serializer.exclude/v.serializerExclude

For example, exclude the `name` field in `EntityStudent`

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

Configuration can be modified in App Config

`src/backend/config/config/config.ts`

* Method 1: Directly modify Openapi parameters

``` typescript

// onions

config.onions = {

entity: {

'demo-student:student': {

fields: {

name: {

serializerTransforms: {

'a-serialization:exclude': {

exclude: true,

},

},

},

},

},

},

};

```

* Method 2: Construct a new schema

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

## @Serializer.replace/v.serializerReplace

For example, to de-identify the value of the `name` field in `EntityStudent`

For example, the original value of `name` is `tom`, and after de-identification it becomes `t***m`

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
+ `v.serializerReplace({ patternFrom: /(\w)(\w+)(\w)/, patternTo: '$1***$3' }),

v.title($locale('Name')),

)
name: string;

}
``

### 3. App Config

Configuration can be modified in App Config

`src/backend/config/config/config.ts`

* Method 1: Directly modify OpenAPI parameters

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

` ... },

};
```

`a-serialization:replace`: Serializer Transform provided by the `a-serialization` module

* Method 2: Construct a new schema

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

## @Serializer.getter/v.serializerGetter

For example, the `fullName` field in `EntityStudent` is composed of the `firstName` and `lastName` fields

### 1. getter

``` diff
class EntityStudent { 
@Api.field() 
firstName: string; 

@Api.field() 
lastName: string; 

@Api.field()
+ get fullName(): string | undefined {
+ return `${this.firstName} ${this.lastName}`;
+ }
}
```

### 2. @Serializer.getter

``` diff
class EntityStudent {
+ @Serializer.getter((data: EntityStudent) => {
+ return `${data.firstName} ${data.lastName}`;
+ }) 
@Api.field() 
fullName: string;
}
```

### 3. v.serializerGetter

``` diff

class EntityStudent {

+ @Api.field(v.serializerGetter((data: EntityStudent) => {

+ return `${data.firstName} ${data.lastName}`;

+ }))

fullName: string;

}
```

### 4. App Config

Configuration can be modified in App Config

`src/backend/config/config/config.ts`

* Method 1: Directly modify OpenAPI parameters

``` typescript

// onions

config.onions = {
entity: {
'demo-student:student': {
fields: {
fullName: {
serializerTransforms: {

'a-serialization:getter': {
getter: (data: EntityStudent) => {
return `${data.firstName} ${data.lastName}`;

},

},

},

},

},

},

},

},

},

},

};
```

`a-serialization:getter`: Serializer Transform provided by the `a-serialization` module

* Method 2: Construct a new schema

``` typescript

import { $makeSchema, v } from 'vona-module-a-openapi';

// onions

config.onions = {

entity: {

'demo-student:student': {

fields: {

fullName: $makeSchema(

v.serializerGetter((data: EntityStudent) => {

return `${data.firstName} ${data.lastName}`;

}),

z.string(),

),

},

},

},

};
```

## @Serializer.custom/v.serializerCustom

For example, convert the `name` field value in `EntityStudent` to uppercase.

### 1. @Serializer.custom

``` diff
class EntityStudent {
+ @Serializer.custom((value: string) => {
+ return value.toUpperCase();

+ })

@Api.field(v.title($locale('Name')))

name: string;

}
```

### 2. v.serializerCustom

``` diff
class EntityStudent {

@Api.field(
+ v.serializerCustom((value: string) => {
+ return value.toUpperCase();

+ }),

v.title($locale('Name')),

)
name: string;

}
```

### 3. App Config

You can do this in App Config Modifying Configuration in `src/backend/config/config/config.ts`

* Method 1: Directly Modify OpenAPI Parameters

``` typescript

// onions

config.onions = {

entity: {

'demo-student:student': {

fields: {

name: {

serializerTransforms: {

'a-serialization:custom': {

custom: (value: string) => {

return value.toUpperCase();

},

},

},

},

},

},

},

},

};

`a-serialization:custom`: Serializer Transform provided by the `a-serialization` module

* Method 2: Construct a New Schema

``` typescript

import { $makeSchema, v } from 'vona-module-a-openapi';

// onions

config.onions = { 
entity: { 
'demo-student:student': { 
fields: { 
name: $makeSchema( 
v.serializerCustom((value: string) => { 
return value.toUpperCase(); 
}), 
z.string(), 
), 
}, 
}, 
},
};
```
