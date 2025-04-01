import type { ContextState, ILocalInfos, PowerPartial } from 'vona';
import type { IDbInfo, ITransactionOptions } from 'vona-module-a-database';
import type { ConfigOnions } from 'vona-module-a-onion';

export const SymbolRouterMiddleware = Symbol('SymbolRouterMiddleware');

export interface INewCtxExtraData {
  state?: ContextState;
  request?: {
    headers?: Record<string, string>;
  };
}

export interface INewCtxOptions {
  dbInfo?: IDbInfo | true;
  locale?: keyof ILocalInfos;
  instanceName?: string | undefined | null;
  instance?: boolean;
  transaction?: boolean;
  transactionOptions?: ITransactionOptions;
  extraData?: INewCtxExtraData | undefined | null;
  innerAccess?: boolean;
  req?: any;
  res?: any;
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
