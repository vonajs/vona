# Dependency Lookup

In addition to `Dependency Injection`, Vona also provides `Dependency Lookup`. In Vona, it is recommended to use dependency lookup, because dependency lookup can make the code more concise and intuitive

## Dependency Lookup in current module

Suppose we want to lookup the ServiceMenu provided by this module home-base in the ControllerMenu of the current module, the code is as follows:

``` typescript
export class ControllerMenu {
  async test() {
    return await this.scope.service.menu.retrieveMenus('');
  }
}
```

- Get the scope object of this current module through `this.scope` to lookup the service provided by this module

## Dependency Lookup Cross-module 

Suppose we want to lookup the ServiceMenu provided by the module home-base in the ControllerHome of the module home-index, the code is as follows:

``` typescript
export class ControllerMenu {
  async test() {
    return await this.$scope.homeBase.service.menu.retrieveMenus('');
  }
}
```

- Get the scope object of the module home-base through `this.$scope.homeBase` to lookup the service provided by module home-base

## Lookup global beans

Suppose we want to lookup the global bean `BeanJwt` provided by module a-jwt in ControllerHome of module home-index, the code is as follows:

``` typescript
export class ControllerMenu {
  async test() {
    return await this.bean.jwt.create({});
  }
}
```

- Get the app bean container through `this.bean` to lookup the global bean