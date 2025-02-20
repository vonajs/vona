import type { IModule } from '@cabloy/module-info';
import type { Constructable } from '../../lib/decorator/type/constructable.ts';
import type { TypeAppInfoConfig } from '../application/app.ts';
import type { VonaLocaleOptionalMap } from '../config/locale.ts';
import type { IMonkeyModule, IMonkeySystem } from './monkey.js';

export interface PluginVonaModulesMeta {
  modules: Record<string, IModule>;
  moduleNames: string[];
}

export interface PluginVonaOptions {
  modulesMeta: PluginVonaModulesMeta;
  locales: VonaLocaleOptionalMap;
  config: TypeAppInfoConfig[];
  AppMonkey?: Constructable<IMonkeyModule & IMonkeySystem>;
}
