import type { TypeAppInfoConfig, TypeOptionsModulesMeta } from '../application/app.ts';
import type { VonaLocaleOptionalMap } from '../config/locale.ts';
import type { AppMonkeyConstructable } from './monkey.ts';

export interface BootstrapOptions {
  modulesMeta: TypeOptionsModulesMeta;
  locales: VonaLocaleOptionalMap;
  config: TypeAppInfoConfig[];
  env: Partial<NodeJS.ProcessEnv>;
  AppMonkey?: AppMonkeyConstructable;
}
