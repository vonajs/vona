import type { IDecoratorDtoOptions } from 'vona-module-a-web';

import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';

import { ModelProduct } from '../model/product.ts';

export interface IDtoOptionsProductView extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsProductView>({})
export class DtoProductView extends $Dto.get(() => ModelProduct) {}
