# 模块

在 Vona 中可以通过模块把 Controller、Service、Model、Entity、Dto、配置、语言等资源打包成内聚的功能块，每个模块聚焦于一个特性场景、业务领域、工作流或通用工具

## 为什么要实现模块化体系？

不知你是否认同一个架构理念：如果要避免`香山`的形成，那就把`香`装进集装箱里

在一个大型的 Web 业务系统当中，随着业务的增长和变更，为了避免代码失控，也有必要将系统拆分为一个个相对独立的模块，这就是 Vona 采用模块化体系的缘由。因此，在 Vona 中，实际的业务代码开发都是在模块中进行

## 模块化体系的意义

### 业务层面

1. **业务解耦**：代码结构清晰，业务逻辑充分解耦
2. **业务逻辑复用**：以模块为开发单元，便于沉淀技术资产，便于在不同的系统中重复利用
3. **分工协作、团队开发**：将业务系统拆分成模块的组合，有利于开发任务的分解与分配

### 代码层面

4. **命名空间隔离**：模块的命名空间隔离机制有利于减少开发时的心智负担，当我们在为模块内部的组件、配置等资源进行变量命名时，不必担心此名称会与其他模块冲突，从而也可以使得变量命名更加精简、自然

## 命名约定

为了实现命名空间隔离，Vona 对模块采用如下命名约定：

```bash
完整名: vona-module-{providerId}-{moduleName}
短名: {providerId}-{moduleName}
```

- providerId: 提供者 Id。可以将某个功能、特性或者组织作为 providerId，比如：test, demo, blog, dashboard, flow, cabloy, apple, 等等
- moduleName: 模块名称

## 新建模块

::: tip
右键菜单 - [项目路径/src/module]: `Vona Create/Module`

右键菜单 - [项目路径/src/module-vendor]: `Vona Create/Module`

右键菜单 - [项目路径/src/suite/suite-name/modules]: `Vona Create/Module`

右键菜单 - [项目路径/src/suite-vendor/suite-name/modules]: `Vona Create/Module`
:::

依据提示输入模块的名称，比如`test-home`，VSCode 插件会自动创建模块的代码骨架
