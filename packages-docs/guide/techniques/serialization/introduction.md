# Serialization

VonaJS provides serialization capabilities, which can transform API response data, such as excluding password fields, masking email and mobile numbers, etc.

First, we'll introduce the general serialization mechanism, followed by a set of utility functions, which make serialization capabilities more convenient to use

## Create Serializer Transform

For example, create a Serializer Transform: `upper` in the module demo-student to convert field values ​​to uppercase

### 1. Cli command

``` bash
$ vona :create:bean serializerTransform upper --module=demo-student
```

### 2. Menu command

::: tip
Context Menu - [Module Path]: `Vona Bean/Serializer Transform`
:::

## Serializer Transform Definition

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

- `TypeSerializerTransformUpperValue`: Defines the field type
- `TypeSerializerTransformUpperData`: Defines the parent object type
- `TypeSerializerTransformUpperResult`: Defines the result type
- `transform`: Converts the field value to uppercase

## Using Serializer Transform

For example, the result type returned by the Student API's `findOne` method is `EntityStudent`. The following code converts the `name` field of `EntityStudent` to uppercase

### 1. Enable Serialization

Serialization needs to be enabled for the API

``` diff

class ControllerStudent {

@Web.get(':id')

@Api.body(v.optional(), v.object(EntityStudent))

+ @Serializer.enable()

async findOne(id) {

return await this.scope.service.student.findOne(id);

}
}
```

- `@Serializer.enable`: Enables serialization

### 2. Set Fields

``` diff

class EntityStudent {

+ @Serializer.transform('demo-student:upper')

@Api.field(v.title($locale('Name')), v.default(''), v.min(3))

name: string;

}
```

- `@Serializer.transform`: Pass in the Serializer Transform name `demo-student:upper`

## Filter Parameters

You can pass Filter parameters to the Serializer Transform. The system first executes the Filter function, and controls whether the current Serializer Transform needs to be executed based on the result.

For example, if the current username is `admin`, the conversion logic for `upper` will not be executed.

``` diff

class EntityStudent {

@Serializer.transform('demo-student:upper', {

+ filter(this: VonaContext) {

+ return this.user.name !== 'admin';

+ },

})

@Api.field(v.title($locale('Name')), v.default(''), v.min(3))

name: string;

}
```

## Serializer Transform Parameters

Parameters can be defined for Serializer Transform, allowing for more flexible configuration of the conversion logic.

For example, define the `first` parameter for Serializer Transform `upper` to control whether only the first letter is capitalized.

### 1. Define Parameter Types

``` diff
export interface ISerializerTransformOptionsUpper extends IDecoratorSerializerTransformOptions {
+ first?: boolean;
}
```

### 2. Provide parameter default values

``` diff
@SerializerTransform<ISerializerTransformOptionsUpper>({
+ first: false,
})
```

### 3. Using parameters

``` diff
export interface ISerializerTransformOptionsUpper extends IDecoratorSerializerTransformOptions { 
first?: boolean;
}

@SerializerTransform<ISerializerTransformOptionsUpper>({ 
first: false,
})
class SerializerTransformUpper { 
async transform( 
value: TypeSerializerTransformUpperValue, 
_data: TypeSerializerTransformUpperData, 
options: ISerializerTransformOptionsUpper, 
): Promise<TypeSerializerTransformUpperResult> {
-return value.toUpperCase();

+ return options.first ? toUpperCaseFirstChar(value) : value.toUpperCase();

}
}
```

### 4. Specifying Parameters When Using

Parameters can be specified for `@Serializer.transform`

``` diff

class EntityStudent {

+ @Serializer.transform('demo-student:upper', { first: true })

@Api.field(v.title($locale('Name')), v.default(''), v.min(3))

name: string;

}
```

### 5. App Config Configuration

Serializer Transform parameters can be configured in App Config

`src/backend/config/config/config.ts`

``` typescript

// onions

config.onions = {
serializerTransform: { 'demo-student:upper': {

first: true,

},

},

};

```

### 6. Parameter Priority

`Specifying parameters at usage` > `App Config configuration` > `Default parameter value`
