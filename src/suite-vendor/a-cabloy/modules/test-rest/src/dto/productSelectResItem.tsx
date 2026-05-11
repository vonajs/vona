import type { IDecoratorDtoOptions } from 'vona-module-a-web';

import { Api, v } from 'vona-module-a-openapiutils';
import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';
import { render } from 'zova-rest-cabloy-basic-admin';

import { $locale } from '../.metadata/locales.ts';
import { ModelProduct } from '../model/product.ts';

export interface IDtoOptionsProductSelectResItem extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsProductSelectResItem>({
  blocks: [
    render.block('basic-page:blockPage', {
      blocks: [
        render.block('basic-page:blockFilter'),
        render.block('basic-page:blockToolbarBulk', {
          actions: [render.tableActionBulk('basic-table:actionCreate')],
        }),
        render.block('basic-page:blockTable'),
        render.block('basic-page:blockPager'),
      ],
    }),
  ],
})
export class DtoProductSelectResItem extends $Dto.get(() => ModelProduct) {
  @Api.field(
    v.title($locale('Operations')),
    render.order(1, 'max'),
    render.cell('basic-table:actionOperationsRow', {
      actions: [
        render.tableActionRow('basic-table:actionUpdate'),
        render.tableActionRow('basic-table:actionDelete'),
      ],
    }),
  )
  _operationsRow?: unknown;
}
