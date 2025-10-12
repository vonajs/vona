export interface IMenuItemLinkRecord {}

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

export interface IMenuItem {
  name: string;
  title?: string;
  description?: string;
  icon?: string;
  order?: number;
  group?: string | string[];
  separator?: boolean;
  link?: keyof IMenuItemLinkRecord;
  external?: boolean;
  target?: string;
  meta?: IMenuItemMeta;
}

export interface IMenuGroup {
  name: string;
  title?: string;
  description?: string;
  icon?: string;
  order?: number;
  group?: string | string[];
  collapsed?: boolean;
}
