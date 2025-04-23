export interface IMenus {
  menus?: IMenuItem[];
  groups?: IMenuGroup[];
}

export interface IMenuItem {
  id: string;
  title?: string;
  caption?: string;
  icon?: string;
  order?: number;
  group?: string | string[];
  separator?: boolean;
  link?: string;
  external?: boolean;
  target?: string;
}

export interface IMenuGroup {
  id: string;
  title?: string;
  caption?: string;
  icon?: string;
  order?: number;
  group?: string | string[];
  collapsed?: boolean;
}
