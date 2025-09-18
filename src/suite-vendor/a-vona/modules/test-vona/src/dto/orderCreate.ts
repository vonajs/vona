import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { $Dto, $relationDynamic } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';
import { ModelOrder } from '../model/order.ts';
import { ModelProduct } from '../model/product.ts';

export interface IDtoOptionsOrderCreate extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsOrderCreate>()
export class DtoOrderCreate
  extends $Dto.create(() => ModelOrder, {
    columns: ['orderNo', 'remark'],
    with: {
      products: $relationDynamic.hasMany(() => ModelProduct, 'orderId', {
        columns: ['name', 'price', 'quantity', 'amount'],
      }),
    },
  }) {}
