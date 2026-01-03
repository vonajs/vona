import type { ILocaleMagic } from 'vona';

export interface IMenus {
  menus?: IMenuItem[];
  groups?: IMenuGroup[];
}

export interface IMenuItemMetaParams {}
export interface IMenuItemMetaQuery {}
export interface IMenuItemMeta {
  params?: IMenuItemMetaParams;
  query?: IMenuItemMetaQuery;
}

export interface IMenuItem<MenuLinks extends {} = {}> {
  name: string;
  title?: string | ILocaleMagic;
  description?: string | ILocaleMagic;
  icon?: string;
  order?: number;
  group?: string | string[];
  separator?: boolean;
  link?: MenuLinks;
  external?: boolean;
  target?: string;
  meta?: IMenuItemMeta;
}

export interface IMenuGroup {
  name: string;
  title?: string | ILocaleMagic;
  description?: string | ILocaleMagic;
  icon?: string;
  order?: number;
  group?: string | string[];
  collapsed?: boolean;
}
