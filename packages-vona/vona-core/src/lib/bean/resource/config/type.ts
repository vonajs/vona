import type { VonaConfigEnv } from '../../../../types/utils/env.ts';
import type { VonaApplication } from '../../../core/application.ts';

export type TypeModuleConfig<T extends (app: VonaApplication, env: VonaConfigEnv) => object> = ReturnType<T>;
