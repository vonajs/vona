export interface IActionOptionsBase {}

export interface IActionOptionsRes extends IActionOptionsBase {
  res?: string;
}

export interface IActionOptionsEvent extends IActionOptionsRes {
  stop?: boolean;
  prevent?: boolean;
  children?: React.ReactNode;
}

export interface IActionOptionsActions extends IActionOptionsRes {
  children?: React.ReactNode;
}
