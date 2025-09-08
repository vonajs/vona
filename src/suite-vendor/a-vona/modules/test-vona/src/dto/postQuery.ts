import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api, v } from 'vona-module-a-openapi';
import { $Dto, $tableName } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';
import { EntityPost } from '../entity/post.ts';

export interface IDtoOptionsPostQuery extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsPostQuery>({
  openapi: { query: { table: $tableName(EntityPost) } },
})
export class DtoPostQuery extends $Dto.queryPage(EntityPost, ['title']) {
  @Api.field(v.optional(), v.openapi({
    query: {
      join: {
        type: 'innerJoin',
        table: 'testVonaUser',
        on: ['userId', 'testVonaUser.id'],
      },
      originalName: 'name',
      op: '_eq_',
    },
  }))
  userName?: string;
}
