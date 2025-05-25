import type { IMenus } from 'vona-module-a-menu';
import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { DtoMenus } from 'vona-module-a-menu';
import { Api, Arg, v } from 'vona-module-a-openapi';
import { Controller, Web } from 'vona-module-a-web';

export interface IControllerOptionsMenu extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsMenu>('menu')
export class ControllerMenu extends BeanBase {
  @Web.get(':publicPath?')
  @Api.body(v.object(DtoMenus))
  async retrieveMenus(@Arg.param('publicPath', v.optional()) publicPath?: string): Promise<IMenus> {
    return await this.scope.service.menu.retrieveMenus(publicPath);
  }
}
