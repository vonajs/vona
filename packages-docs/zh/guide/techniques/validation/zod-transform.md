# Zod Transform

可以使用`Zod Transform`实现更灵活的转换逻辑

## 创建Zod Transform

比如，在模块 demo-student 中创建一个 Zod Transform: `nameCapitalize`，将学生名的首字符改为大写

### 1. Cli命令

``` bash
$ vona :create:bean zodTransform nameCapitalize --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Bean/Zod Transform`
:::

## Zod Transform定义

``` typescript
export interface TypeZodTransformNameExistsData { name: string }

export interface IZodTransformOptionsNameExists extends IDecoratorZodTransformOptions {}

@ZodTransform<IZodTransformOptionsNameExists>()
class ZodTransformNameExists {
  async execute(value: TypeZodTransformNameExistsData, refinementCtx: TypeTransformmentCtx, _options: IZodTransformOptionsNameExists) {
    const student = await this.scope.model.student.getByName(value.name);
    if (student) {
      refinementCtx.addIssue({
        code: 'custom',
        message: 'Student Exists',
        path: ['name'],
      });
    }
  }
}
```

- `TypeZodTransformNameExistsData`: 入参类型
- `IZodTransformOptionsNameExists`: 定义 Zod Transform 参数
- `execute`: 对入参进行判断，如果学生已存在，则调用`refinementCtx.addIssue`生成自定义错误消息

## 使用Zod Transform

``` diff
import { v } from 'vona-module-a-openapi';

@Controller()
class ControllerStudent {
  @Web.post()
+ async create(@Arg.body(v.refine('demo-student:nameExists')) student: DtoStudentCreate) {}
}
```

- `v.refine`: 此工具函数用于使用 Zod Transform，只需传入 Zod Transform 的名称
  - `nameExists` zod refine 属于模块`demo-student`，因此完整的名称是`demo-student:nameExists`

## Zod Transform参数

可以为 Zod Transform 定义参数，通过参数更灵活的配置 Zod Transform 逻辑

比如，为 `nameExists` zod refine 定义`errorMessage`参数，用于提供自定义错误消息

### 1. 定义参数类型

``` diff
export interface IZodTransformOptionsNameExists extends IDecoratorZodTransformOptions {
+ errorMessage: string;
}
```

### 2. 提供参数缺省值

``` diff
@ZodTransform<IZodTransformOptionsNameExists>({
+ errorMessage: 'Student Exists',
})
```

### 3. 使用参数

``` diff
export interface TypeZodTransformNameExistsData { name: string }

export interface IZodTransformOptionsNameExists extends IDecoratorZodTransformOptions {
  errorMessage: string;
}

@ZodTransform<IZodTransformOptionsNameExists>({
  errorMessage: 'Student Exists',
})
class ZodTransformNameExists {
  async execute(value: TypeZodTransformNameExistsData, refinementCtx: TypeTransformmentCtx, options: IZodTransformOptionsNameExists) {
    const student = await this.scope.model.student.getByName(value.name);
    if (student) {
      refinementCtx.addIssue({
        code: 'custom',
-       message: 'Student Exists',
+       message: options.errorMessage,
        path: ['name'],
      });
    }
  }
}
```

### 4. 使用时指定参数

可以在使用时指定 Zod Transform 参数

``` diff
class ControllerStudent {
  @Web.post()
+ async create(@Arg.body(v.refine('demo-student:nameExists', { errorMessage: 'Student Exists!!!' })) student: DtoStudentCreate) {}
}
```

### 5. App config配置

可以在 App config 中配置 Zod Transform 参数

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

### 6. 参数优先级

`使用时指定参数` > `App config配置` > `参数缺省值`

