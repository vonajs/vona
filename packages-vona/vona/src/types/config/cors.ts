import { VonaContext } from '../context/index.js';
import { IOnionSliceBase } from '../interface/onion.js';

export interface ConfigCors extends IOnionSliceBase {
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
