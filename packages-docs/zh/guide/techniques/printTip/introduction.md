# PrintTip

VonaJS 在系统启动时在控制台`统一`输出提示信息。如下图所示：
 
![](../../../assets/img/printTip/printTip-1.png)

可以通过`PrintTip`添加自定义的提示信息

## 创建meta.printTip

比如，在模块 demo-student 中创建`meta.printTip`。在系统启动时在控制台输出`=== Hello World ===`

### 1. Cli命令

``` bash
$ vona :create:bean meta printTip --module=demo-student
```

### 2. 菜单命令

::: tip
右键菜单 - [模块路径]: `Vona Meta/Print Tip`
:::

## meta.election定义

``` typescript
export type TypeElectionObtainResource = 'echo';

@Meta()
export class MetaElection extends BeanElectionBase<TypeElectionObtainResource> {}
```

- `TypeElectionObtainResource`: 定义 Election 资源的类型

