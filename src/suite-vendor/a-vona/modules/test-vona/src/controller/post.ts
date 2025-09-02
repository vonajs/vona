import type { IQueryParams } from 'vona-module-a-orm';
import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import assert from 'node:assert';
import { BeanBase } from 'vona';
import { Api, v } from 'vona-module-a-openapi';
import { Passport } from 'vona-module-a-user';
import { Arg, Controller, Web } from 'vona-module-a-web';
import { DtoPostQuery } from '../dto/postQuery.ts';
import { EntityPost } from '../entity/post.ts';

export interface IControllerOptionsPost extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsPost>('post', { meta: { mode: ['test', 'dev'] } })
export class ControllerPost extends BeanBase {
  @Web.get('findMany')
  @Api.body(v.array(EntityPost))
  @Passport.public()
  async findMany(@Arg.queryPro(DtoPostQuery) params: IQueryParams): Promise<EntityPost[]> {
    console.log(params);
    assert.deepEqual(params.columns, ['*']);
    assert.deepEqual(params.where, {
      'stars': { _gt_: 12 },
      'title': { _includesI_: 'ai' },
      'testVonaUser.name': 'tom',
    });
    assert.deepEqual(params.orders, [['createdAt', 'desc']]);
    assert.equal(params.offset, 30);
    assert.equal(params.limit, 30);
    delete params.orders;
    return await this.scope.service.post.findMany(params);
  }
}
