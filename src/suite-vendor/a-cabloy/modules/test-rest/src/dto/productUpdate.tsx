import type { IDecoratorDtoOptions } from 'vona-module-a-web';

import { v } from 'vona-module-a-openapiutils';
import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';

import { $locale } from '../.metadata/locales.ts';
import { ModelProduct } from '../model/product.ts';

export interface IDtoOptionsProductUpdate extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsProductUpdate>({
  openapi: { title: $locale('UpdateProduct') },
  fields: {},
  blocks: [
    render.block('basic-pageentry:blockPageEntry', {
      blocks: [
        render.block('basic-pageentry:blockForm'),
        render.block('basic-pageentry:blockToolbarRow', {
          actions: [
            render.formActionRow('basic-form:actionSubmit', {
              permission: { action: 'update', formScene: ['create', 'edit'] },
            }),
            render.formActionRow('basic-form:actionBack', { permission: { public: true } }),
          ],
        }),
      ],
    }),
  ],
})
export class DtoProductUpdate extends $Dto.update(() => ModelProduct) {}
