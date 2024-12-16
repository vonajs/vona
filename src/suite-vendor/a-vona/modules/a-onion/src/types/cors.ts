import { VonaContext } from 'vona';
import { IOnionOptionsBase } from './onion.js';
import { IApiPathRecord } from 'vona-module-a-web';

export interface ConfigCors extends IOnionOptionsBase<keyof IApiPathRecord> {
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
