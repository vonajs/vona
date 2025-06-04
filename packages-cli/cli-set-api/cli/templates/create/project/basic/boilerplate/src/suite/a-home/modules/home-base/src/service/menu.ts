import type { IMenus } from 'vona-module-a-menu';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceMenu extends BeanBase {
  async retrieveMenus(publicPath?: string): Promise<IMenus> {
    return await this.$scope.menu.service.menu.retrieveMenus(publicPath, async () => {
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
