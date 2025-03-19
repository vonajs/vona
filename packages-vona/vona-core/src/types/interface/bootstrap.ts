import type { IModule } from '@cabloy/module-info';
import type { TypeAppInfoConfig } from '../application/app.ts';
import type { VonaLocaleOptionalMap } from '../config/locale.ts';
import type { AppMonkeyConstructable } from './monkey.ts';

export interface VonaModulesMeta {
  modules: Record<string, IModule>;
  moduleNames: string[];
}

export interface BootstrapOptions {
  modulesMeta: VonaModulesMeta;
  locales: VonaLocaleOptionalMap;
  config: TypeAppInfoConfig[];
  env: Partial<NodeJS.ProcessEnv>;
  AppMonkey?: AppMonkeyConstructable;
}
