import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import type { IMenus } from '../types/menu.ts';
import { Api, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';
import { DtoMenuGroup } from './menuGroup.ts';
import { DtoMenuItem } from './menuItem.ts';

export interface IDtoOptionsMenus extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsMenus>()
export class DtoMenus implements IMenus {
  @Api.field(v.optional(), v.array(DtoMenuItem))
  menus?: DtoMenuItem[];

  @Api.field(v.optional(), v.array(DtoMenuGroup))
  groups?: DtoMenuGroup[];
}
