import type { ILocaleMagic } from 'vona';

export interface IMenus<Pages extends {} = {}> {
  menus?: IMenuItem<Pages>[];
  groups?: IMenuGroup[];
}

export interface IMenuItemMetaParams {}
export interface IMenuItemMetaQuery {}
export interface IMenuItemMeta {
  params?: IMenuItemMetaParams;
  query?: IMenuItemMetaQuery;
}

export interface IMenuItem<Pages extends {} = {}> {
  name: string;
  title?: string | ILocaleMagic;
  description?: string | ILocaleMagic;
  icon?: string;
  order?: number;
  group?: string | string[];
  separator?: boolean;
  link?: keyof Pages;
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
