import type { IDecoratorDtoOptions } from 'vona-module-a-web';

import { v } from 'vona-module-a-openapiutils';
import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';

import { ModelProduct } from '../model/product.ts';

export interface IDtoOptionsProductView extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsProductView>({
  actions: [
    v.renderActionRow('operationsRow', {
      actions: [v.renderActionRow('back', { permission: { public: true } })],
    }),
  ],
})
export class DtoProductView extends $Dto.get(() => ModelProduct) {}
