import type { IDecoratorDtoOptions } from 'vona-module-a-web';

import { Api, v } from 'vona-module-a-openapiutils';
import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';
import { ZovaRender } from 'zova-rest-cabloy-basic-admin';

import { $locale } from '../.metadata/locales.ts';
import { ModelProduct } from '../model/product.ts';

export interface IDtoOptionsProductSelectResItem extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsProductSelectResItem>({
  blocks: [
    ZovaRender.block('basic-page:blockPage', {
      blocks: [
        ZovaRender.block('basic-page:blockFilter'),
        ZovaRender.block('basic-page:blockToolbarBulk', {
          actions: [render.tableActionBulk('basic-table:actionCreate')],
        }),
        ZovaRender.block('basic-page:blockTable'),
        ZovaRender.block('basic-page:blockPager'),
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
