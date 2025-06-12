# package.json

可以在模块的`package.json`中设置一些元配置

## vonaModule.capabilities

如果需要在模块中提供一些钩子功能，从而在系统启动时初始化资源，或者向系统注入一些能力，那么就需要配置`vonaModule.capabilities`

Vona 提供的许多核心模块都是采用这种机制实现的。比如，模块 a-queue 的配置：

```typescript
{
  "name": "vona-module-a-queue",
  "vonaModule": {
    "capabilities": {
      "monkey": true
    },
  },
}
```

- monkey: 设为 true，就说明该模块提供了钩子能力

## vonaModule.dependencies

如果模块需要依赖其他模块，那么，需要配置`vonaModule.dependencies`，比如：模块 home-user 的配置：

```typescript
{
  "name": "vona-module-home-user",
  "vonaModule": {
    "dependencies": {
      "a-vona": "5.0.0"
    },
  },
}
```

## vonaModule.globalDependencies

如果模块需要提供全局的依赖项，那么，需要配置`vonaModule.globalDependencies`，比如：模块 a-core 的配置：

```typescript
{
  "name": "vona-module-a-core",
  "vonaModule": {
    "globalDependencies": {
      "chalk": true,
      "moment": true,
    },
  },
}
```

- 由于模块 a-core 将`chalk`和`moment`声明为全局依赖，那么系统就会将这些依赖项放入项目的 packages.json 当中，从而所有其他模块都可以直接导入这些模块，并使用

## vonaModule.globalDependenciesDev

如果模块需要提供全局的依赖项，那么，需要配置`vonaModule.globalDependenciesDev`，比如：模块 a-core 的配置：

```typescript
{
  "name": "vona-module-a-core",
  "vonaModule": {
    "globalDependenciesDev": {
      "@types/koa": true,
      "@types/node": true,
    },
  },
}
```

- 由于模块 a-core 将`@types/koa`和`@types/node`声明为全局开发依赖，那么系统就会将这些依赖项放入项目的 packages.json 当中，从而所有其他模块都可以直接导入这些模块，并使用