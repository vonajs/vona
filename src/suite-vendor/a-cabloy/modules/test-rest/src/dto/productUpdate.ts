import type { IDecoratorDtoOptions } from 'vona-module-a-web';

import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';

import { $locale } from '../.metadata/locales.ts';
import { ModelProduct } from '../model/product.ts';

export interface IDtoOptionsProductUpdate extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsProductUpdate>({
  openapi: { title: $locale('UpdateProduct') },
  fields: {},
})
export class DtoProductUpdate extends $Dto.update(() => ModelProduct) {}
