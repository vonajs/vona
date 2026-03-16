import type { TypeEventRetrieveMenusResult } from '../bean/event.retrieveMenus.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanMenu extends BeanBase {
  async retrieveMenus(publicPath?: string): Promise<TypeEventRetrieveMenusResult> {
    publicPath = publicPath ?? '';
    return await this.scope.event.retrieveMenus.emit({ publicPath }, async () => {
      return await this.bean.ssr.retrieveMenus(publicPath);
    });
  }
}
