import type { ContextState, ILocaleInfos, PowerPartial } from 'vona';
import type { IDbInfo, ITransactionOptions } from 'vona-module-a-database';
import type { ConfigOnions } from 'vona-module-a-onion';

export const SymbolRouterMiddleware = Symbol('SymbolRouterMiddleware');

export interface INewCtxExtraData {
  state?: ContextState;
  request?: {
    headers?: Record<string, string>;
  };
}

export interface INewCtxOptions extends INewCtxBaseOptions {
  dbInfo?: IDbInfo | true;
}

export interface INewCtxBaseOptions {
  locale?: keyof ILocaleInfos;
  instanceName?: string | undefined | null;
  instance?: boolean;
  transaction?: boolean;
  transactionOptions?: ITransactionOptions;
  extraData?: INewCtxExtraData | undefined;
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
  extraData?: INewCtxExtraData | undefined;
}

export interface IGeneralInfoOptions {
  dbInfo?: IDbInfo;
  locale?: keyof ILocaleInfos;
  instanceName?: string | undefined | null;
  extraData?: INewCtxExtraData;
}
