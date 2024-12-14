import { PowerPartial } from 'vona';

export interface ConfigOnions {}

declare module 'vona' {
  export interface VonaConfig {
    onions: ConfigOnions;
  }

  export interface CtxMeta {
    /** dynamic onions middleware options */
    onionsDynamic?: PowerPartial<ConfigOnions>;
  }
}
