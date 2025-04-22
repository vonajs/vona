import type { IMenus } from 'vona-module-a-menu';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceMenu extends BeanBase {
  async retrieveMenus(): Promise<IMenus> {
    return await this.scope.event.retrieveMenus.emit(undefined, async () => {
      return this._getMenusDefault();
    });
  }

  private _getMenusDefault(): IMenus {
    return {
      items: [
        { title: this.$scope.homeIndex.locale.Home(), icon: '::home', link: '/' },
      ],
    };
  }
}
