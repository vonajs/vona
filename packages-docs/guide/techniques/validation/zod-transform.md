# Zod Transform

You can use `Zod Transform` to implement more flexible transform logic

## Create Zod Transform

For example, create a Zod Transform `nameCapitalize` in the module demo-student to capitalize the first character of a student's name

### 1. Cli command

``` bash
$ vona :create:bean zodTransform nameExists --module=demo-student
```

### 2. Menu command

::: tip
Context Menu - [Module Path]: `Vona Bean/Zod Transform`
:::

## Zod Transform Definition

``` typescript
export interface TypeZodTransformNameExistsData { name: string }

export interface IZodTransformOptionsNameExists extends IDecoratorZodTransformOptions {}

@ZodTransform<IZodTransformOptionsNameExists>()
class ZodTransformNameExists {
  async execute(value: TypeZodTransformNameExistsData, transformmentCtx: TypeTransformmentCtx, _options: IZodTransformOptionsNameExists) {
    const student = await this.scope.model.student.getByName(value.name);
    if (student) {
      transformmentCtx.addIssue({
        code: 'custom',
        message: 'Student Exists',
        path: ['name'],
      });
    }
  }
}
```

- `TypeZodTransformNameExistsData`: Input parameter type
- `IZodTransformOptionsNameExists`: Defines Zod Transform parameters
- `execute`: Validates the input parameter. If the student already exists, `transformmentCtx.addIssue` is called to generate a custom error message

## Using Zod Transform

``` diff
import { v } from 'vona-module-a-openapi';

@Controller()
class ControllerStudent {
  @Web.post()
+ async create(@Arg.body(v.transform('demo-student:nameExists')) student: DtoStudentCreate) {}
}
```

- `v.transform`: This function is used to use Zod Transform. Simply pass the Zod Transform name
  - The `nameExists` Zod Transform belongs to the `demo-student` module, so the full name is `demo-student:nameExists`

## Zod Transform Parameters

You can define parameters for Zod Transform, allowing for more flexible configuration of Zod Transform logic

For example, define the `errorMessage` parameter for the `nameExists` Zod Transform to provide custom error message

### 1. Defining parameter types

``` diff
export interface IZodTransformOptionsNameExists extends IDecoratorZodTransformOptions {
+ errorMessage: string;
}
```

### 2. Providing default values ​​for parameters

``` diff
@ZodTransform<IZodTransformOptionsNameExists>({
+ errorMessage: 'Student Exists',
})
```

### 3. Using Parameters

``` diff
export interface TypeZodTransformNameExistsData { name: string }

export interface IZodTransformOptionsNameExists extends IDecoratorZodTransformOptions {
  errorMessage: string;
}

@ZodTransform<IZodTransformOptionsNameExists>({
  errorMessage: 'Student Exists',
})
class ZodTransformNameExists {
  async execute(value: TypeZodTransformNameExistsData, transformmentCtx: TypeTransformmentCtx, options: IZodTransformOptionsNameExists) {
    const student = await this.scope.model.student.getByName(value.name);
    if (student) {
      transformmentCtx.addIssue({
        code: 'custom',
-       message: 'Student Exists',
+       message: options.errorMessage,
        path: ['name'],
      });
    }
  }
}
```

### 4. Specify parameters when using

You can specify Zod Transform parameters when using

``` diff
class ControllerStudent {
  @Web.post()
+ async create(@Arg.body(v.transform('demo-student:nameExists', { errorMessage: 'Student Exists!!!' })) student: DtoStudentCreate) {}
}
```

### 5. App config

Zod Transform parameters can be configured in App config

`src/backend/config/config/config.ts`

``` typescript
// onions
config.onions = {
  zodTransform: {
    'demo-student:nameExists': {
      errorMessage: 'Student Exists!!!',
    },
  },
};
```

### 6. Parameter precedence

`Specify parameters when using` > `App config` > `Default values`
