import type { IDecoratorDtoOptions } from 'vona-module-a-web';

import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';

import { ModelProduct } from '../model/product.ts';

export interface IDtoOptionsProductQueryRes extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsProductQueryRes>()
export class DtoProductQueryRes extends $Dto.selectAndCount(() => ModelProduct) {}
