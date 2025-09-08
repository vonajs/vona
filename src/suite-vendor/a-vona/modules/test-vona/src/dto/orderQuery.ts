import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api, v } from 'vona-module-a-openapi';
import { $Dto, $tableName } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';
import { EntityOrder } from '../entity/order.ts';
import { EntityUser } from '../entity/user.ts';

export interface IDtoOptionsOrderQuery extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsOrderQuery>({
  openapi: {
    query: {
      table: $tableName(EntityOrder),
    },
  },
})
export class DtoOrderQuery
  extends $Dto.query(EntityOrder, ['orderNo', 'remark']) {
  @Api.field(v.optional(), v.openapi({
    query: {
      table: $tableName(EntityUser),
      joinType: 'innerJoin',
      joinOn: ['userId', 'testVonaUser.id'],
      originalName: 'name',
    },
  }))
  userName?: string;
}
