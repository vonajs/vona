import { VonaApplication } from '../../../../index.js';

// todo: remove
export type TypeModuleConfig<T extends (app: VonaApplication) => object> = ReturnType<T>;

// todo: remove
export interface IModuleConfigMiddleware {
  bean: string | { module: string; name: string };
  global?: boolean;
  dependencies?: string | string[];
}
