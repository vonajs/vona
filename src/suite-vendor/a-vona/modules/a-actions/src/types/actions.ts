import type { IControllerRecord } from 'vona-module-a-web';

export interface IActionOptionsBase {
  res?: string;
}

export interface IActionViewOptions extends IActionOptionsBase {
  resource?: keyof IControllerRecord;
  id?: string;
}

export interface IActionLogOptions extends IActionOptionsBase {
  message?: string;
}
