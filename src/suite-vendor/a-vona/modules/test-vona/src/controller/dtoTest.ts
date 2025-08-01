import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Api, v } from 'vona-module-a-openapi';
import { $Dto } from 'vona-module-a-orm';
import { Controller, Web } from 'vona-module-a-web';
import { DtoCategoryTree } from '../dto/categoryTree.ts';
import { DtoUserLazy } from '../dto/userLazy.ts';

export interface IControllerOptionsDtoTest extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsDtoTest>('dtoTest', { meta: { mode: ['test', 'dev'] } })
export class ControllerDtoTest extends BeanBase {
  @Web.get('getUserLazy')
  getUserLazy(): DtoUserLazy {
    return {} as any;
  }

  @Web.get('getUserDynamic')
  @Api.body($Dto.get('test-vona:post'))
  getPostDynamic() {
  }

  @Web.get('getUserStats')
  @Api.body($Dto.get('test-vona:userStats'))
  getUserStats() {
  }

  @Web.get('getUserStatsGroup')
  @Api.body($Dto.get('test-vona:userStatsGroup'))
  getUserStatsGroup() {
  }

  @Web.post('createUser')
  @Api.body(v.object($Dto.create('test-vona:user', { include: { posts: true } })))
  createUser() {
  }

  @Web.patch('updateUser/:id')
  @Api.body(v.object($Dto.update('test-vona:user', { include: { posts: true } })))
  updateUser() {
  }

  @Web.get('getCategoryTree')
  @Api.body(v.array($Dto.get('test-vona:category', { columns: ['id', 'name'] })))
  async getCategoryTree() {
    const items = await this.scope.model.category.select({ columns: ['id', 'name'] });
    return items;
  }

  @Web.get('getCategoryTree2')
  @Api.body(v.array(DtoCategoryTree))
  async getCategoryTree2() {
    const items = await this.scope.model.category.select({ columns: ['id', 'name'] });
    return items;
  }
}
