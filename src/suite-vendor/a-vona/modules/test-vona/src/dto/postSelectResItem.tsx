import type { IDecoratorDtoOptions } from 'vona-module-a-web';

import { Api, v } from 'vona-module-a-openapiutils';
import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';

import { $locale } from '../.metadata/locales.ts';
import { ModelPost } from '../model/post.ts';

export interface IDtoOptionsPostSelectResItem extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsPostSelectResItem>({
  actions: [
    v.renderActionBulk('operationsBulk', {
      actions: [v.renderActionBulk('create')],
    }),
  ],
})
export class DtoPostSelectResItem extends $Dto.get(() => ModelPost, {
  include: { postContent: true },
}) {
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
