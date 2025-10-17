# Zod Refine

可以使用`Zod Refine`实现更灵活的验证逻辑

## 创建Zod Refine

比如，在模块 demo-student 中创建一个 Zod Refine: `nameExists`，判断学生名是否已经存在

### 1. Cli命令

``` bash
$ vona :create:bean zodRefine nameExists --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Bean/Zod Refine`
:::

## Zod Refine定义

``` typescript
export type TypeZodRefineNameExistsData = string;

export interface IZodRefineOptionsNameExists extends IDecoratorZodRefineOptions {}

@ZodRefine<IZodRefineOptionsNameExists>()
class ZodRefineNameExists {
  async execute(value: TypeZodRefineNameExistsData, refinementCtx: TypeRefinementCtx, _options: IZodRefineOptionsNameExists) {
    const student = await this.scope.model.student.getByName(value);
    if (student) {
      refinementCtx.addIssue({
        code: 'custom',
        message: 'Student Exists',
      });
    }
  }
}
```

- `TypeZodRefineNameExistsData`: 入参类型
- `IZodRefineOptionsNameExists`: 定义 Zod Refine 参数
- `execute`: 对入参进行判断，如果学生已存在，则调用`refinementCtx.addIssue`生成自定义错误消息

## 使用Zod Refine





