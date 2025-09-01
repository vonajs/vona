import type { IFindManyParams } from 'vona-module-a-orm';
import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import assert from 'node:assert';
import { BeanBase } from 'vona';
import { Api, v } from 'vona-module-a-openapi';
import { ArgQuery } from 'vona-module-a-orm';
import { Passport } from 'vona-module-a-user';
import { Controller, Web } from 'vona-module-a-web';
import { DtoPostQuery } from '../dto/postQuery.ts';
import { EntityPost } from '../entity/post.ts';

export interface IControllerOptionsPost extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsPost>('post', { meta: { mode: ['test', 'dev'] } })
export class ControllerPost extends BeanBase {
  @Web.get('findMany')
  @Api.body(v.array(EntityPost))
  @Passport.public()
  async findMany(@ArgQuery(DtoPostQuery) params: IFindManyParams): Promise<EntityPost[]> {
    console.log(params);
    assert.deepEqual(params.columns, ['*']);
    return await this.scope.service.post.findMany(params);
  }
}
