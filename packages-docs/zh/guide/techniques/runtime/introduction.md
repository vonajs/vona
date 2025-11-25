# Runtime

VonaJS 在系统启动时将一些动态运行数据`统一`输出到`Runtime`文件中，用于排查问题，或开发其他管理工具

## Runtime目录

针对不同的运行环境默认使用不同的 Runtime 目录:

- `测试环境/开发环境`: `{project path}/.app/runtime`
- `生产环境`: `{home}/vona/{project name}/runtime`

## 创建meta.runtime

可以通过`Runtime`添加自定义的动态运行数据

比如，在模块 demo-student 中创建`meta.runtime`。在系统启动时在控制台输出`=== Hello World ===`

### 1. Cli命令

``` bash
$ vona :create:bean meta printTip --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Meta/Print Tip`
:::

## meta.printTip定义

``` typescript
@Meta()
export class MetaPrintTip extends BeanBase implements IMetaPrintTipExecute {
  async execute(): Promise<TypeMetaPrintTipResult> {
    return {
      title: 'Test',
      message: '=== Hello World ===',
    };
  }
}
```

- `execute`: 返回需要输出的提示信息，支持数组类型

如下图所示：
 
![](../../../assets/img/printTip/printTip-2.png)
