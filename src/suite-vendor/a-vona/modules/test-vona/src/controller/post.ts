import type { IQueryParams } from 'vona-module-a-orm';
import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import type { ModelPost } from '../model/post.ts';
import { BeanBase } from 'vona';
import { Api, v } from 'vona-module-a-openapiutils';
import { Passport } from 'vona-module-a-user';
import { Arg, Controller, Web } from 'vona-module-a-web';
import { DtoPostAggregate } from '../dto/postAggregate.ts';
import { DtoPostGroup } from '../dto/postGroup.ts';
import { DtoPostQuery } from '../dto/postQuery.ts';
import { DtoPostQueryRes } from '../dto/postQueryRes.ts';

export interface IControllerOptionsPost extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsPost>('post', { meta: { mode: ['test', 'dev'] } })
export class ControllerPost extends BeanBase {
  @Web.get('group')
  @Api.body(v.array(DtoPostGroup))
  async group(): Promise<DtoPostGroup[]> {
    return await this.scope.model.post.group({
      groups: 'userId',
      aggrs: {
        count: '*',
        sum: 'stars',
      },
    });
  }

  @Web.get('aggregate')
  @Api.body(DtoPostAggregate)
  async aggregate(): Promise<DtoPostAggregate> {
    return await this.scope.model.post.aggregate({
      aggrs: {
        count: ['*', 'stars'],
        sum: 'stars',
        avg: 'stars',
        min: 'stars',
        max: 'stars',
      },
    });
  }

  @Web.get('findManyEcho')
  @Api.body(DtoPostQueryRes)
  @Passport.public()
  findManyEcho(@Arg.filter(DtoPostQuery) params: IQueryParams<ModelPost>) {
    return params;
  }

  @Web.get('findMany')
  @Api.body(DtoPostQueryRes)
  @Passport.public()
  async findMany(@Arg.filter(DtoPostQuery) params: IQueryParams<ModelPost>) {
    return await this.scope.service.post.findMany(params);
  }
}
