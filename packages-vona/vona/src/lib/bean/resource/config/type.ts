import { VonaApplication } from '../../../../index.js';

export type TypeModuleConfig<T extends (app: VonaApplication) => object> = ReturnType<T>;
