export interface IMenus {
  menus?: IMenuItem[];
  groups?: IMenuGroup[];
}

export interface IMenuItemMeta {}

export interface IMenuItem {
  name: string;
  title?: string;
  description?: string;
  icon?: string;
  order?: number;
  group?: string | string[];
  separator?: boolean;
  link?: string;
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
