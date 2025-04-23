import type { IMenus } from 'vona-module-a-menu';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceMenu extends BeanBase {
  async retrieveMenus(): Promise<IMenus> {
    return await this.$scope.menu.service.menu.retrieveMenus(async () => {
      return this._getMenusDefault();
    });
  }

  private _getMenusDefault(): IMenus {
    return {
      items: [
        { id: 'home', title: this.$scope.homeIndex.locale.Home(), icon: '::home', link: '/' },
      ],
    };
  }
}
