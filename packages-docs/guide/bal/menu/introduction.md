# Menu System

The `a-menu` module provides a generic menu system. In fact, this `menu system` can be completely ignored, and your own menu retrieval logic can be provided. However, using a system-defined menu system facilitates the sharing and reuse of code resources within the community, significantly improving the system's scalability and maintainability

## bean.menu

The module `a-menu` provides a global bean `bean.menu`, which allows for the unified retrieval of menus

Taking the module `home-base` as an example:

`src/suite/a-home/modules/home-base/src/service/menu.ts`

``` typescript
class ServiceMenu {
  async retrieveMenus(publicPath?: string): Promise<IMenus> {
    return await this.bean.menu.retrieveMenus(publicPath, async () => {
      return this._getMenusDefault();
    });
  }

  private _getMenusDefault(): IMenus {
    return {
      menus: [
        { name: 'home', title: this.$scope.homeIndex.locale.Home(), icon: '::home', link: '/' },
      ],
    };
  }
}
```

- `bean.menu.retrieveMenus`: Retrieves the menus
- `_getMenusDefault`: Provides the default menus

## bean.menu.retrieveMenus

``` typescript
class BeanMenu {
  async retrieveMenus(
    publicPath?: string,
    nextOrDefault?: NextEventStrict<TypeEventRetrieveMenusData, TypeEventRetrieveMenusResult> | TypeEventRetrieveMenusResult,
  ): Promise<TypeEventRetrieveMenusResult> {
    return await this.scope.event.retrieveMenus.emit({ publicPath }, nextOrDefault);
  }
}
```

* Parameters

|Name|Description|
|--|--|
|publicPath|URL path, can provide different menus for different paths|
|nextOrDefault|Retrieves the default menus|

- The `retrieveMenus` method raises an event `a-menu:retrieveMenus`
- The `a-menu:retrieveMenus` event uses the onion model. You can add event listeners to implement custom menu retrieval logic

## Menu API

The `home-base` module provides an API for retrieving the menus, making it `out-of-the-box`

`src/suite/a-home/modules/home-base/src/controller/menu.ts`

``` typescript
class ControllerMenu {
  @Web.get(':publicPath?')
  @Api.body(v.object(DtoMenus))
  async retrieveMenus(@Arg.param('publicPath', v.optional()) publicPath?: string): Promise<IMenus> {
    return await this.scope.service.menu.retrieveMenus(publicPath);
  }
}
```
