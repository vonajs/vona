import { ContextState, ILocalInfos } from 'vona';

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
