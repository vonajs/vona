import type { IDecoratorDtoOptions } from 'vona-module-a-web';

import { v } from 'vona-module-a-openapiutils';
import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';

import { ModelProduct } from '../model/product.ts';

export interface IDtoOptionsProductView extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsProductView>({
  blocks: [
    render.block('basic-pageentry:blockPageEntry', {
      blocks: [
        render.block('basic-pageentry:blockForm'),
        render.block('basic-pageentry:blockToolbarRow', {
          actions: [
            render.formActionRow('basic-form:actionBack', { permission: { public: true } }),
          ],
        }),
      ],
    }),
  ],
})
export class DtoProductView extends $Dto.get(() => ModelProduct) {}
