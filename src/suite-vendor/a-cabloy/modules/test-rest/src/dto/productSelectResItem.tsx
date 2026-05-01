import type { IDecoratorDtoOptions } from 'vona-module-a-web';

import { Api, v } from 'vona-module-a-openapiutils';
import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';

import { $locale } from '../.metadata/locales.ts';
import { ModelProduct } from '../model/product.ts';

export interface IDtoOptionsProductSelectResItem extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsProductSelectResItem>({
  actions: [
    v.renderActionBulk('operationsBulk', {
      actions: [v.renderActionBulk('create')],
    }),
  ],
})
export class DtoProductSelectResItem extends $Dto.get(() => ModelProduct) {
  @Api.field(
    v.title($locale('Operations')),
    v.renderOrder(1, 'max'),
    v.renderComponent(
      'ActionOperationsRow',
      {
        actions: [v.renderActionRow('update'), v.renderActionRow('delete')],
      },
      'table',
    ),
  )
  _operationsRow?: unknown;
}
