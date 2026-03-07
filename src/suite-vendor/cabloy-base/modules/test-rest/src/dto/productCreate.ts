import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';
import { $locale } from '../.metadata/locales.ts';
import { ModelProduct } from '../model/product.ts';

export interface IDtoOptionsProductCreate extends IDecoratorDtoOptions<'_test'> {
}

@Dto<IDtoOptionsProductCreate>({
  openapi: { title: $locale('CreateProduct') },
  fields: {
    _test: {
      title: 'Test',
      rest: {
        render: 'text',
      },
    },
  },
})
export class DtoProductCreate extends $Dto.create(() => ModelProduct) {}
