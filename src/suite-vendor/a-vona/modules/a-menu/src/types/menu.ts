export interface IMenuItem {
  title?: string;
  caption?: string;
  icon?: string;
  link?: string;
  external?: boolean;
  target?: string;
  group?: string | string[];
}

export interface IMenuGroup {
  name: string;
  title?: string;
  caption?: string;
  icon?: string;
  collapsed?: boolean;
}
