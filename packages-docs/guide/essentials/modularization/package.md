# package.json

You can set some meta configuration in the module's `package.json`

## vonaModule.capabilities

If you need to provide some hook functions in the module to initialize resources when the system starts, or inject some capabilities into the system, you need to configure `vonaModule.capabilities`

Many core modules provided by Vona are implemented using this mechanism. For example, the configuration of module `a-queue`:

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

- monkey: If set to `true`, it means that the module provides hook capabilities

## vonaModule.dependencies

If a module needs to depend on other modules, you need to configure `vonaModule.dependencies`, for example: the configuration of module `home-user`:

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

If the module needs to provide global dependencies, you need to configure `vonaModule.globalDependencies`, for example: the configuration of module `a-core`:

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

- Since the module a-core declares `chalk` and `moment` as global dependencies, the system will put these dependencies into the project's `packages.json`, so that all other modules can directly import these modules and use

## vonaModule.globalDependenciesDev

If the module needs to provide global dev dependencies, you need to configure `vonaModule.globalDependenciesDev`, for example: the configuration of module `a-core`:


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

- Since the module a-core declares `@types/koa` and `@types/node` as global dev dependencies, the system will put these dependencies into the project's `packages.json`, so that all other modules can directly import these modules and use
