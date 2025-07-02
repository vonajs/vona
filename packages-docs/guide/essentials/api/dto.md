# Dto

## Create Dto

For example, we create a Dto in the module demo-student: `studentCreate`

### 1. Cli command

``` bash
$ vona :create:bean dto studentCreate --module=demo-student
```

### 2. Menu command

::: tip
Right-click menu - [Module path]: `Vona Create/Dto`
:::

## Dto definition

``` typescript
@Dto<IDtoOptionsStudentCreate>()
export class DtoStudentCreate {}
```

- Use Dto decorator

## @Api.field

Generally speaking, when defining a field, you need to specify the field type, validation rules, and Swagger/Openapi metadata

The usage of `@Api.field` in Dto is the same as that of Entity

- See: [Entity](./entity.md)

* Example:

- `name`: `string, min(3), title: 'Name'(supports I18n)`

- `description`: `string, optional, title: 'Description'(supports I18n)`

``` typescript
class DtoStudentCreate {
@Api.field(v.openapi({ title: $locale('Name') }), v.min(3))
name: string;

@Api.field(v.openapi({ title: $locale('Description') }), v.optional())
description?: string;
}
```

## Dto Options

|Name|Description|
|--|--|
|independent|Whether to display independently in Swagger/Openapi, default is false|
|openapi|Metadata related to Swagger/Openapi|
|fields|Define Fields options|

- independent: If the Controller Action references an entity, the entity is automatically exported to Swagger/Openapi. If `independent: true` is specified, the entity will always be output to Swagger/Openapi

### 1. Example: openapi

Provide description information for dto so that it can be displayed in Swagger/Openapi

``` typescript
@Dto({
openapi: { description: 'Create Student' },
})
class DtoStudentCreate {}
```

* Support I18n internationalization

Create language resources:

`src/module/demo-student/src/config/locale/en-us.ts`

``` typescript
export default {
CreateStudent: 'Create Student',
};
```

`src/module/demo-student/src/config/locale/zh-cn.ts`

``` typescript
export default {
CreateStudent: 'Create a student',
};
```

Use `$locale` function for language translation

``` typescript
import { $locale } from '../.metadata/index.ts';

@Dto({
openapi: { description: $locale('CreateStudent') },
})
class DtoStudentCreate {}
```

### 2. Example: fields

Change the openapi information of the field `name` to: `title: 'Student Name'`

``` typescript
@Dto({
fields: {
name: { title: 'Student Name' },
},
})
class DtoStudentCreate {}
```

## App config configuration

Dto options can be configured in App config

`src/backend/config/config/config.dev.ts`

``` typescript
// onions
config.onions = {
dto: {
'demo-student:studentCreate': {
openapi: {
description: 'Create Student',
},
fields: {
name: { title: 'Student Name' },
},
},
},
};
```

## Mapped Class

In the above, we define two fields for `DtoStudentCreate`: `name` and `description`. In fact, these two fields are also defined in `EntityStudent`. In order to achieve code reuse and improve development efficiency, Vona provides 4 Mapped tool functions to derive the target class from the existing class

### 1. ClassMapped.pick

Extract the two fields `name` and `description` from `EntityStudent` to generate Dto`DtoStudentCreate`

``` typescript
class DtoStudentCreate extends ClassMapped.pick(EntityStudent, ['name', 'description']) {}
```

### 2. ClassMapped.partial

Change all fields in `DtoStudentCreate` to optional and generate Dto`DtoStudentUpdate`

``` typescript
class DtoStudentUpdate extends ClassMapped.partial(DtoStudentCreate) {}
```

Change the field `name` in `DtoStudentCreate` to optional and generate Dto`DtoStudentUpdate`

``` typescript
class DtoStudentUpdate extends ClassMapped.partial(DtoStudentCreate, ['name']) {}
```

### 3. ClassMapped.omit

Exclude the field `id` in `EntityStudent` and generate Dto`DtoStudentOther`

``` typescript
class DtoStudentOther extends ClassMapped.omit(EntityStudent, ['id']) {}
```

### 4. ClassMapped.mixin

Merge the fields in multiple classes to generate a new Dto`DtoStudentOther`

``` typescript
class DtoStudentOther extends ClassMapped.mixin(EntityStudent, DtoStudentCreate, DtoStudentUpdate) {}
```

### 5. Combination

You can combine multiple Mapped tool functions

``` typescript
class DtoStudentUpdate
extends ClassMapped.partial(ClassMapped.pick(EntityStudent, ['name', 'description'])) {}
```