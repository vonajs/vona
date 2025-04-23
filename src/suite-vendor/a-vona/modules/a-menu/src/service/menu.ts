import type { NextEventStrict } from 'vona-module-a-event';
import type { TypeEventRetrieveMenusData, TypeEventRetrieveMenusResult } from '../bean/event.retrieveMenus.ts';
import type { IMenus } from '../types/menu.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceMenu extends BeanBase {
  async retrieveMenus(
    nextOrDefault?: NextEventStrict<TypeEventRetrieveMenusData, TypeEventRetrieveMenusResult> | TypeEventRetrieveMenusResult,
  ): Promise<IMenus> {
    return await this.scope.event.retrieveMenus.emit(undefined, nextOrDefault);
  }
}
