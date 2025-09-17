import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';
import { EntityOrder } from '../entity/order.ts';

export interface IDtoOptionsOrderQueryPage extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsOrderQueryPage>()
export class DtoOrderQueryPage extends $Dto.queryPage(EntityOrder, ['orderNo', 'remark']) {}
