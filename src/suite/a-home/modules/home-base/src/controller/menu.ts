import type { IMenus } from 'vona-module-a-menu';
import { BeanBase } from 'vona';
import { DtoMenus } from 'vona-module-a-menu';
import { Api, v } from 'vona-module-a-openapi';
import { Controller, Web } from 'vona-module-a-web';

@Controller('menu')
export class ControllerMenu extends BeanBase {
  @Web.get()
  @Api.body(v.object(DtoMenus))
  async retrieveMenus(): Promise<IMenus> {
    return await this.scope.service.menu.retrieveMenus();
  }
}
