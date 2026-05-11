import type { IDecoratorDtoOptions } from 'vona-module-a-web';

import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';
import { render } from 'zova-rest-cabloy-basic-admin';

import { $locale } from '../.metadata/locales.ts';
import { ModelProduct } from '../model/product.ts';

export interface IDtoOptionsProductCreate extends IDecoratorDtoOptions<'_test'> {}

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
export class DtoProductCreate extends $Dto.create(() => ModelProduct) {}
