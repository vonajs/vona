import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api } from 'vona-module-a-openapi';
import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';
import z from 'zod';
import { EntityOrder } from '../entity/order.ts';

export interface IDtoOptionsOrderQueryPage extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsOrderQueryPage>()
export class DtoOrderQueryPage extends $Dto.queryPage(EntityOrder, ['orderNo', 'remark']) {
  @Api.field(z.number().min(1).max(300).default(30))
  declare pageSize: number;
}

// @Api.field(z.number().min(1).max(pageSizeMax).default(pageSizeDefault))
//   pageSize: number;
