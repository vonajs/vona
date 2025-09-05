import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api, v } from 'vona-module-a-openapi';
import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';
import { EntityOrder } from '../entity/order.ts';

export interface IDtoOptionsOrderQuery extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsOrderQuery>()
export class DtoOrderQuery
  extends $Dto.query(EntityOrder, ['remark']) {
  @Api.field(v.optional())
  orderNo?: string;
}
