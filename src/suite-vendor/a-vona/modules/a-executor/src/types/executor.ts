import { ContextState, ILocalInfos, PowerPartial, VonaContext } from 'vona';
import { ConfigOnions } from 'vona-module-a-onion';
import { TypeRequestMethod } from 'vona-module-a-web';

export interface IRunInAnonymousContextScopeOptions {
  locale?: keyof ILocalInfos;
  instanceName?: string | null | undefined;
  instance?: boolean;
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
}

export interface IPerformActionOptions {
  innerAccess?: boolean;
  // subdomain, deprecated
  query?: object;
  headers?: object;
  body?: object;
  onions?: PowerPartial<ConfigOnions>;
}

export interface IPerformActionInnerParams {
  ctxCaller: VonaContext;
  innerAccess?: boolean;
  // subdomain, deprecated
  method: TypeRequestMethod;
  path: any;
  query?: object;
  headers?: object;
  body?: object;
  onions?: PowerPartial<ConfigOnions>;
}
