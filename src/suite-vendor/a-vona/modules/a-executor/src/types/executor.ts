import type { ContextState, IInstanceRecord, ILocaleInfos, PowerPartial } from 'vona';
import type { ConfigOnions } from 'vona-module-a-onion';
import type { IDbInfo, ITransactionOptions } from 'vona-module-a-orm';

export const SymbolRouterMiddleware = Symbol('SymbolRouterMiddleware');

export interface INewCtxExtraData {
  state?: ContextState;
  request?: {
    headers?: Record<string, string>;
  };
}

export interface INewCtxOptions extends INewCtxBaseOptions {
  dbInfo?: Partial<IDbInfo>;
}

export interface INewCtxBaseOptions {
  locale?: keyof ILocaleInfos;
  instanceName?: keyof IInstanceRecord | undefined | null;
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
  params?: object;
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
  instanceName?: keyof IInstanceRecord | undefined | null;
  extraData?: INewCtxExtraData;
}
