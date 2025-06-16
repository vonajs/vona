# Module

In Vona, `Modules` consolidate controllers, services, models, entities, dtos, configurations, languages, errors ​​and other resources into cohesive blocks of functionality, each focused on a feature scene, application business domain, workflow, or common collection of utilities

## Why need Modularization?

May you agree with such an architectural concept: if you want to avoid `shit mountains`, then put `shit` into boxes

In a large web business system, as the business grows and changes, it is also necessary to divide the system into relatively independent modules in order to avoid code bloating. This is why Vona introduces modularization

## Benefits of Modularization

### For Business

1. **Business decoupling**: clear code structure and fully decoupled business logic
2. **Business logic reuse**: Taking modules as development units, it is convenient to deposit technical assets and reuse them in different systems
3. **Team development**: the business system is divided into modules, which is conducive to the decomposition and allocation of development tasks

### For Code

4. **Namespace isolation**: the namespace isolation mechanism of the module helps to reduce the mental burden during development. When we name variables for resources such as service, config and so on in the module, we don’t have to worry that this name will conflict with other modules, which can also make variable naming more concise and natural

## Naming Convention

To achieve namespace isolation, Vona introduces the following naming convention for modules:

```bash
FullName: vona-module-{providerId}-{moduleName}
ShortName: {providerId}-{moduleName}
```

- You can use a function, feature or organization as a `providerid`, such as: test, demo, blog, dashboard, flow, cabloy, apple, etc.

## Create Module

### 1. Cli command

``` bash
$ vona :create:module moduleName [--suite=]
```

- moduleName: this name of module
- suite: this name of suite, maybe empty

### 2. Menu command

::: tip
Context Menu - [Project Path/src/module]: `Vona Create/Module`

Context Menu - [Project Path/src/module-vendor]: `Vona Create/Module`

Context Menu - [Project Path/src/suite/suite-name/modules]: `Vona Create/Module`

Context Menu - [Project Path/src/suite-vendor/suite-name/modules]: `Vona Create/Module`
:::

Enter the module name according to the prompt, such as `demo-student`, and the VSCode extension will automatically create the code skeleton of the module
