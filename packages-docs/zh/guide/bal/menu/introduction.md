# 菜单体系

模块`a-menu`提供了通用的菜单体系。事实上可以完全忽略这个`菜单体系`，提供自己的菜单获取逻辑。但是，使用系统约定的`菜单体系`有利于在社区中分享和复用代码资源，显著提升系统的扩展性和可维护性

## bean.menu

模块`a-menu`提供了全局 Bean `bean.menu`，可以通过统一的方式获取菜单

以模块`home-base`为例：

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

- `bean.menu.retrieveMenus`: 获取菜单
- `_getMenusDefault`: 提供缺省菜单

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

* 参数

|名称|说明|
|--|--|
|publicPath|URL路径，可以为不同的路径提供不同的菜单|
|nextOrDefault|获取缺省菜单|

- `retrieveMenus`方法会抛出一个事件`a-menu:retrieveMenus`
- 事件`a-menu:retrieveMenus`是洋葱圈模型。可以添加事件监听器实现自定义的菜单获取逻辑

## Menu API

模块`home-base`提供了获取菜单的 API，实现`开箱即用`

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
