import { VonaContext } from '../../types/index.js';

export interface PerformActionParams {
  innerAccess?: boolean;
  // subdomain, deprecated
  method: 'post' | 'get';
  url: string;
  query?: object;
  params?: object;
  headers?: object;
  body?: object;
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
}
