import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';
import { ModelOrder } from '../model/order.ts';

export interface IDtoOptionsOrderResult extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsOrderResult>()
export class DtoOrderResult extends $Dto.get(() => ModelOrder) {}
