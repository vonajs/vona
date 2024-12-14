import { VonaContext } from 'vona';
import { IOnionOptionsBase } from './onion.js';

export interface ConfigCors extends IOnionOptionsBase {
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

declare module 'vona' {
  export interface VonaConfig {
    cors: ConfigCors;
  }
}
