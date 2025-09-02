import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api, v } from 'vona-module-a-openapi';
import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';
import { EntityPost } from '../entity/post.ts';

export interface IDtoOptionsPostQuery extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsPostQuery>()
export class DtoPostQuery extends $Dto.queryPage(EntityPost, ['title']) {
  @Api.field(v.openapi({
    query: {
      join: {
        type: 'innerJoin',
        table: 'testVonaUser',
        on: ['userId', 'testVonaUser.id'],
      },
    },
  }))
  userName: string;
}
