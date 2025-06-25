# Dependency injection

Vona injects Bean instances through `@Use` decorator function

## Resolution rules

Vona adopts a modular system, and Bean Classes are provided by different modules. When using the Bean Class inside the same module, you can directly resolve it based on `Class type`. When using cross-module, you can resolve it based on `Bean identifier` instead of `Class type/file path`, which is conducive to achieving loose coupling between modules

## Dependency injection: Based on Class type

Suppose we want to inject the ServiceMenu provided by the module home-base into the ControllerHome of the module home-index. The code is as follows:

``` typescript
import { ServiceMenu } from 'vona-module-a-menu';
export class ControllerHome {
  @Use()
  menu: ServiceMenu;
}  
```

## Dependency injection: Based on Bean identifier

``` typescript
import type { ServiceMenu } from 'vona-module-a-menu';
export class ControllerHome {
  @Use('home-base.service.menu')
  menu: ServiceMenu;
}  
```

- Since the imported `ServiceStudent` is of `type`, the Bean identifier of the Service needs to be specified
