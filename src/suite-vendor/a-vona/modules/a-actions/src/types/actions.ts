import type { IResourceRecord } from 'vona-module-a-openapi';

export interface IActionOptionsBase {
  res?: string;
}

export interface IActionOptionsNone {}

export interface IActionExprOptions extends IActionOptionsNone {
  expression: string;
}

export interface IActionVarOptions extends IActionOptionsNone {
  name: string;
  value: any;
}

export interface IActionLogOptions extends IActionOptionsNone {
  message: string;
}

export interface IActionViewOptions extends IActionOptionsNone {
  resource?: keyof IResourceRecord;
  id?: string;
}
