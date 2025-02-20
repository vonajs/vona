import type { IModule } from '@cabloy/module-info';
import type { Constructable } from '../../lib/decorator/type/constructable.ts';
import type { VonaLocaleOptionalMap } from '../config/locale.ts';
import type { TypeModuleResourceConfig } from './module.ts';
import type { IMonkeyModule, IMonkeySystem } from './monkey.js';

export interface PluginVonaModulesMeta {
  modules: Record<string, IModule>;
  moduleNames: string[];
}

export interface PluginVonaOptions {
  modulesMeta: PluginVonaModulesMeta;
  locales: VonaLocaleOptionalMap;
  config: TypeModuleResourceConfig[];
  AppMonkey?: Constructable<IMonkeyModule & IMonkeySystem>;
}
