import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api, v } from 'vona-module-a-openapi';
import { $Dto, $tableName } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';
import { EntityPost } from '../entity/post.ts';

export interface IDtoOptionsPostQuery extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsPostQuery>({
  openapi: { filter: { table: $tableName(EntityPost) } },
})
export class DtoPostQuery extends $Dto.queryPage(EntityPost, ['title']) {
  @Api.field(v.optional())
  title?: string;

  @Api.field(
    v.filter({
      table: 'testVonaUser',
      joinOn: ['userId', 'testVonaUser.id'],
      originalName: 'name',
      op: '_eqI_',
    }),
    v.optional(),
  )
  userName?: string;

  @Api.field(v.filterDateRange({ separator: ' - ' }), v.optional())
  createdAt: string;
}
