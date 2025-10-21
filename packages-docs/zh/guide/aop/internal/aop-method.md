# AOP Method

`AOP Method`允许我们直接在 Class Method 上通过装饰器切入逻辑

## 创建AOP Method

比如，在模块 demo-student 中创建一个 AOP Method: `log`，用于输出方法的执行时长

### 1. Cli命令

``` bash
$ vona :create:bean guard admin --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Aspect/Guard`
:::

## 守卫定义

``` typescript
export interface IGuardOptionsAdmin extends IDecoratorGuardOptions {}

@Guard<IGuardOptionsAdmin>()
class GuardAdmin {
  async execute(_options: IGuardOptionsAdmin, next: Next): Promise<boolean> {
    const user = this.bean.passport.getCurrentUser();
    if (!user || user.name !== 'admin') this.app.throw(403);
    // next
    return next();
  }
}
```

- `getCurrentUser`: 取得当前用户

## 使用守卫

