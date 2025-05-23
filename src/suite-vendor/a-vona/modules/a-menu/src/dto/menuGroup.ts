import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import type { IMenuGroup } from '../types/menu.ts';
import { Api, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';
import { z } from 'zod';

export interface IDtoOptionsMenuGroup extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsMenuGroup>()
export class DtoMenuGroup implements IMenuGroup {
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
  collapsed?: boolean;
}
