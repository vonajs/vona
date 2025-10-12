import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import type { IMenuItem, IMenuItemLinkRecord, IMenuItemMeta } from '../types/menu.ts';
import { Api, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';
import { z } from 'zod';
import { DtoMenuItemMeta } from './menuItemMeta.ts';

export interface IDtoOptionsMenuItem extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsMenuItem>()
export class DtoMenuItem implements IMenuItem {
  @Api.field()
  name: string;

  @Api.field(v.optional())
  title?: string;

  @Api.field(v.optional())
  description?: string;

  @Api.field(v.optional())
  icon?: string;

  @Api.field(v.optional())
  order?: number;

  @Api.field(v.optional(), z.union([z.string(), z.array(z.string())]))
  group?: string | string[];

  @Api.field(v.optional())
  separator?: boolean;

  @Api.field(v.optional(), z.string())
  link?: keyof IMenuItemLinkRecord;

  @Api.field(v.optional())
  external?: boolean;

  @Api.field(v.optional())
  target?: string;

  @Api.field(v.optional(), v.object(DtoMenuItemMeta))
  meta?: IMenuItemMeta;
}
