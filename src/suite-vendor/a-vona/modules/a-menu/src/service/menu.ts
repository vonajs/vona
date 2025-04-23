import type { NextEventStrict } from 'vona-module-a-event';
import type { TypeEventRetrieveMenusData, TypeEventRetrieveMenusResult } from '../bean/event.retrieveMenus.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceMenu extends BeanBase {
  async retrieveMenus(
    publicPath?: string,
    nextOrDefault?: NextEventStrict<TypeEventRetrieveMenusData, TypeEventRetrieveMenusResult> | TypeEventRetrieveMenusResult,
  ): Promise<TypeEventRetrieveMenusResult> {
    return await this.scope.event.retrieveMenus.emit({ publicPath }, nextOrDefault);
  }
}
