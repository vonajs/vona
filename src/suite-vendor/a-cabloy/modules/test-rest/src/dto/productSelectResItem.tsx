import type { IDecoratorDtoOptions } from 'vona-module-a-web';

import { Api, v } from 'vona-module-a-openapiutils';
import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';

import { $locale } from '../.metadata/locales.ts';
import { ModelProduct } from '../model/product.ts';

export interface IDtoOptionsProductSelectResItem extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsProductSelectResItem>({
  blocks: [
    v.renderBlock('BlockPage', {
      blocks: [
        v.renderBlock('BlockFilter'),
        v.renderBlock('BlockToolbarBulk', {
          actions: [v.renderActionBulk('create')],
        }),
        v.renderBlock('BlockTable'),
        v.renderBlock('BlockPager'),
      ],
    }),
  ],
})
export class DtoProductSelectResItem extends $Dto.get(() => ModelProduct) {
  @Api.field(
    v.title($locale('Operations')),
    v.renderOrder(1, 'max'),
    v.renderCell('ActionOperationsRow', {
      actions: [v.renderActionRow('update'), v.renderActionRow('delete')],
    }),
  )
  _operationsRow?: unknown;
}
