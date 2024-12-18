import { ContextState, ILocalInfos, PowerPartial, VonaContext } from 'vona';
import { ConfigOnions } from 'vona-module-a-onion';

export interface IRunInAnonymousContextScopeOptions {
  locale?: keyof ILocalInfos;
  subdomain?: string | null | undefined;
  instance?: boolean;
  module?: string; // todo: remove
}

export interface INewCtxExtraData {
  headers?: Record<string, string>;
  state?: ContextState;
}

export interface INewCtxOptions {
  locale?: keyof ILocalInfos;
  subdomain?: string | null | undefined;
  dbLevel?: number;
  transaction?: boolean;
  instance?: boolean;
  extraData?: INewCtxExtraData;
}

export interface IPerformActionParams<METHOD, PATH> {
  innerAccess?: boolean;
  // subdomain, deprecated
  method: METHOD;
  path: PATH;
  query?: object;
  params?: object;
  headers?: object;
  body?: object;
  onions?: PowerPartial<ConfigOnions>;
}

export interface IPerformActionInnerParams {
  ctxCaller: VonaContext;
  innerAccess?: boolean;
  // subdomain, deprecated
  method: 'post' | 'get';
  url: string;
  query?: object;
  params?: object;
  headers?: object;
  body?: object;
  onions?: PowerPartial<ConfigOnions>;
}
