import { VonaApplication } from '../../../../index.js';

export type TypeModuleConfig<T extends (app: VonaApplication) => object> = ReturnType<T>;

export interface IModuleConfigBroadcast {
  bean: string | { module: string; name: string };
}

export interface IModuleConfigMiddleware {
  bean: string | { module: string; name: string };
  global?: boolean;
  dependencies?: string | string[];
}
