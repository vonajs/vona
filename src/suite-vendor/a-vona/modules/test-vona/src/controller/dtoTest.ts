import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { $Dto } from 'vona-module-a-database';
import { Api, v } from 'vona-module-a-openapi';
import { Controller, Web } from 'vona-module-a-web';
import { DtoUserLazy } from '../dto/userLazy.ts';

export interface IControllerOptionsDtoTest extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsDtoTest>('dtoTest', { meta: { mode: ['test', 'dev'] } })
export class ControllerDtoTest extends BeanBase {
  @Web.get('getUserLazy')
  getUserLazy(): DtoUserLazy {
    return {} as any;
  }

  @Web.get('getUserDynamic')
  @Api.body($Dto.compose('test-vona:post'))
  getPostDynamic() {
  }

  @Web.get('getCategoryTree')
  @Api.body(v.array($Dto.compose('test-vona:category', { columns: ['id', 'name'] })))
  async getCategoryTree() {
    const items = await this.scope.model.category.select({ columns: ['id', 'name'] });
    return items;
  }
}
