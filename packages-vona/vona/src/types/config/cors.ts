import { VonaContext } from '../context/index.js';
import { IMiddlewareBase } from '../interface/middleware.js';

export interface ConfigCors extends IMiddlewareBase {
  origin: ((ctx: VonaContext) => boolean) | string[] | string;
  allowMethods: string[] | string;
  exposeHeaders: string[] | string;
  allowHeaders: string[] | string;
  maxAge: string | number;
  credentials: ((ctx: VonaContext) => boolean) | boolean;
  keepHeadersOnError: boolean;
  secureContext: boolean;
  privateNetworkAccess: boolean;
}
