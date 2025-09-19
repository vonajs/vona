import type { IQueryParams } from 'vona-module-a-orm';
import type { IDecoratorControllerOptions, IPipeOptionsQueryTransformInfo } from 'vona-module-a-web';
import type { ModelPost } from '../model/post.ts';
import { BeanBase } from 'vona';
import { Api } from 'vona-module-a-openapi';
import { Passport } from 'vona-module-a-user';
import { Arg, Controller, Web } from 'vona-module-a-web';
import { DtoPostAggregate } from '../dto/postAggregate.ts';
import { DtoPostQuery } from '../dto/postQuery.ts';
import { DtoPostQueryRes } from '../dto/postQueryRes.ts';

export interface IControllerOptionsPost extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsPost>('post', { meta: { mode: ['test', 'dev'] } })
export class ControllerPost extends BeanBase {
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
  findManyEcho(@Arg.queryPro(DtoPostQuery) params: IQueryParams<ModelPost>) {
    return params;
  }

  findManyQueryTransform(_info: IPipeOptionsQueryTransformInfo): boolean | undefined {
    return undefined;
  }

  @Web.get('findMany')
  @Api.body(DtoPostQueryRes)
  @Passport.public()
  async findMany(@Arg.queryPro(DtoPostQuery) params: IQueryParams<ModelPost>) {
    return await this.scope.service.post.findMany(params);
  }
}
