import type { IMenuItem } from '../types/menu.ts';
import { Api, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';
import { z } from 'zod';

@Dto()
export class DtoMenuItem implements IMenuItem {
  @Api.field()
  id: string;

  @Api.field(v.optional())
  title?: string;

  @Api.field(v.optional())
  caption?: string;

  @Api.field(v.optional())
  icon?: string;

  @Api.field(v.optional())
  link?: string;

  @Api.field(v.optional())
  external?: boolean;

  @Api.field(v.optional())
  target?: string;

  @Api.field(v.optional(), z.union([z.string(), z.array(z.string())]))
  group?: string | string[];
}
