import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import type { IMenuItemMetaParams, IMenuItemMetaQuery } from '../types/menu.ts';
import { Api, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';
import { DtoMenuItemMetaParams } from './menuItemMetaParams.ts';
import { DtoMenuItemMetaQuery } from './menuItemMetaQuery.ts';

export interface IDtoOptionsMenuItemMeta extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsMenuItemMeta>()
export class DtoMenuItemMeta {
  @Api.field(v.optional(), v.object(DtoMenuItemMetaParams))
  params?: IMenuItemMetaParams;

  @Api.field(v.optional(), v.object(DtoMenuItemMetaQuery))
  query?: IMenuItemMetaQuery;
}
