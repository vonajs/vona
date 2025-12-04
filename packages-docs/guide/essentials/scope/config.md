# Config

Modules can individually provide their own `Config` configuration

## Initialize code skeleton

### 1. Cli command

``` bash
$ vona :init:config home-index
```

### 2. Menu command

::: tip
Context Menu - [Module Path]: `Vona Init/Config`
:::

## Define Config

Taking the module `home-index` as an example, define the `Config` configuration of the module:

`src/suite/a-home/modules/home-index/src/config/config.ts`

```typescript{3}
export function config(_app: VonaApplication) {
  return {
    title: 'Hello World',
  };
}
```

- Just define the required configuration fields directly, and the system will automatically extract the type information of config

## Use Config

The `Config` configuration of the module can be obtained through the `Scope` instance

```typescript{3}
class ControllerHome {
  index() {
    console.log(this.scope.config.title);
  }
}
```

## Use Config cross-module

```typescript{3}
class ControllerHome {
  index() {
    console.log(this.$scope.homeIndex.config.title);
  }
}
```

## Override Config

You can use `project-level` Config to override `module-level` Config

`src/backend/config/config/config.ts`

```typescript{6-8}
export default async function (_app: VonaApplication, _env: VonaConfigEnv) {
  const config: VonaConfigOptional = {};

  // modules
  config.modules = {
    'home-index': {
      title: 'Hello World!!',
    },
  };

  return config;
}
```

- Change the `title` of the module `home-index` to `Hello World!!`
