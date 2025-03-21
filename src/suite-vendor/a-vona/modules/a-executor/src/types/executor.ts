import type { ContextState, ILocalInfos, PowerPartial } from 'vona';
import type { ConfigOnions } from 'vona-module-a-onion';

export const SymbolRouterMiddleware = Symbol('SymbolRouterMiddleware');

export interface IRunInAnonymousContextScopeOptions {
  locale?: keyof ILocalInfos;
  instanceName?: string | null | undefined;
  instance?: boolean;
  req?: any;
  reqInherit?: boolean;
}

export interface INewCtxExtraData {
  headers?: Record<string, string>;
  state?: ContextState;
}

export interface INewCtxOptions {
  locale?: keyof ILocalInfos;
  instanceName?: string | undefined | null;
  instance?: boolean;
  dbLevel?: number;
  transaction?: boolean;
  extraData?: INewCtxExtraData;
  innerAccess?: boolean;
  req?: any;
  reqInherit?: boolean;
}

export interface IPerformActionOptions {
  innerAccess?: boolean;
  // instanceName, deprecated
  query?: object;
  headers?: object;
  body?: any;
  onions?: PowerPartial<ConfigOnions>;
  authToken?: string;
}
