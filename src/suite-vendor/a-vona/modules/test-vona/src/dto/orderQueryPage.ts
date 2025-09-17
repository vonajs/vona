import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';
import z from 'zod';
import { EntityOrder } from '../entity/order.ts';

export interface IDtoOptionsOrderQueryPage extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsOrderQueryPage>({
  fields: {
    pageSize: z.number().min(1).max(300).default(30),
  },
})
export class DtoOrderQueryPage extends $Dto.queryPage(EntityOrder, ['orderNo', 'remark']) {}
