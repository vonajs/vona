import { ConfigOnion, ContextState, ILocalInfos, PowerPartial, VonaContext } from 'vona';

export interface IRunInAnonymousContextScopeOptions {
  locale?: keyof ILocalInfos;
  subdomain?: string | null | undefined;
  instance?: boolean;
  module?: string; // todo: remove
}

export interface IExecutorMockCtxExtraData {
  headers?: Record<string, string>;
  state?: ContextState;
}

export interface IExecutorMockCtxOptions {
  locale?: keyof ILocalInfos;
  subdomain?: string | null | undefined;
  dbLevel?: number;
  transaction?: boolean;
  instance?: boolean;
  extraData?: IExecutorMockCtxExtraData;
}

export interface IPerformActionParams {
  innerAccess?: boolean;
  // subdomain, deprecated
  method: 'post' | 'get';
  url: string;
  query?: object;
  params?: object;
  headers?: object;
  body?: object;
  onion?: PowerPartial<ConfigOnion>;
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
  onion?: PowerPartial<ConfigOnion>;
}
