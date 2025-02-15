import type { VonaContext } from 'vona';
import type { IApiPathRecord } from 'vona-module-a-web';
import type { IOnionOptionsBase } from './onion.js';

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
