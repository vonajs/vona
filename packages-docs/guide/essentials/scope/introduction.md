# Module Scope

In Vona, the actual business code development is done in modules. As a relatively independent business unit, the module contains various types of resources: `Config`, `Constant`, `Locale I18n`, `Error exception`, `Service`, `Model`, `Entity`, etc. In order to uniformly manage these resources and facilitate the definition and use of resources, Vona provides the `Scope` object

## Why is Vona's IOC container code more concise?

The reason is to prioritize the use of the `dependency lookup` strategy, resulting in fewer decorator functions and fewer type annotations. Accessing module's resources by the `Scope` object is one of the mechanisms for implementing `dependency lookup` strategies

## How to obtain Scope Instance?

All beans inherit from the base class `BeanBase`, thus the `Scope` instance of the module to which the current bean belongs can be directly obtained

Take `src/suite/a-home/modules/home-base/src/service/menu.ts` as an example：

```typescript
@Service()
export class ServiceMenu extends BeanBase {
  retrieveMenus(publicPath?: string) {
    console.log(this.scope);
  }
}
```

- The `Scope` instance of the module to which the current bean belongs can be obtained through `this.scope`

## How to obtain Scope Instance cross-module?

So, how to obtain `Scope` instances of other modules?

For example, we obtain the Scope instance of the module home-base in the module home-index:

``` typescript
@Controller()
class ControllerHome extends BeanBase {
  index() {
    console.log(this.$scope.homeBase);
  }
}
```

- The `Scope` instance of the module home-base can be obtained through `this.$scope.homeBase`

## Members of the Scope object

| Name     | Description               |
| -------- | ------------------------- |
| config   | Config of Module          |
| constant | Constant of Module        |
| locale   | I18n of Module            |
| error    | Error exception of Module |
| service  | Services of Module     |
| model  | Models of Module     |
| entity  | Entities of Module     |
