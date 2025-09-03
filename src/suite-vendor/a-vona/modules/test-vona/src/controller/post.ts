import type { IQueryParams } from 'vona-module-a-orm';
import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Api } from 'vona-module-a-openapi';
import { Passport } from 'vona-module-a-user';
import { Arg, Controller, Web } from 'vona-module-a-web';
import { DtoPostQuery } from '../dto/postQuery.ts';
import { DtoPostQueryRes } from '../dto/postQueryRes.ts';
import { EntityPost } from '../entity/post.ts';

export interface IControllerOptionsPost extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsPost>('post', { meta: { mode: ['test', 'dev'] } })
export class ControllerPost extends BeanBase {
  @Web.get('findManyEcho')
  @Api.body(DtoPostQueryRes)
  @Passport.public()
  findManyEcho(@Arg.queryPro(DtoPostQuery) params: IQueryParams<EntityPost>) {
    return params;
  }

  @Web.get('findMany')
  @Api.body(DtoPostQueryRes)
  @Passport.public()
  async findMany(@Arg.queryPro(DtoPostQuery) params: IQueryParams<EntityPost>) {
    return await this.scope.service.post.findMany(params);
  }
}
