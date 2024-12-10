import { ConfigOnion, PowerPartial, VonaContext } from '../../types/index.js';
import { ILocalInfos } from '../bean/index.js';

export interface PerformActionParams {
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

export interface PerformActionInnerParams {
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

export interface IExecuteBeanOptions {
  locale?: keyof ILocalInfos;
  subdomain?: string | null | undefined;
  transaction?: boolean;
  instance?: boolean;
}
