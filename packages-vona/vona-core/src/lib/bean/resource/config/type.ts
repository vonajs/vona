import type { VonaApplication } from '../../../../index.ts';

export type TypeModuleConfig<T extends (app: VonaApplication) => object> = ReturnType<T>;
