export interface IMenus {
  items?: IMenuItem[];
  groups?: IMenuGroup[];
}

export interface IMenuItem {
  id: string;
  title?: string;
  caption?: string;
  icon?: string;
  link?: string;
  external?: boolean;
  target?: string;
  group?: string | string[];
}

export interface IMenuGroup {
  id: string;
  title?: string;
  caption?: string;
  icon?: string;
  collapsed?: boolean;
}
