import { IModule } from '@cabloy/module-info';
import { CabloyContext } from '../index.js';

export type TypeMonkeyName = keyof IMonkeyModule | keyof IMonkeySystem;

export interface IMonkeyApp {
  moduleLoading(module: IModule): Promise<void>;
  moduleLoaded(module: IModule): Promise<void>;
  configLoaded(module: IModule, config: any): Promise<void>;
  metaLoaded(module: IModule, meta: any): Promise<void>;
}

export interface IModuleMain {
  moduleLoading(): Promise<void>;
  moduleLoaded(): Promise<void>;
  configLoaded(config: any): Promise<void>;
  metaLoaded(meta: any): Promise<void>;
}

export interface IMonkeyModule {
  moduleLoading(module: IModule): Promise<void>;
  moduleLoaded(module: IModule): Promise<void>;
  configLoaded(module: IModule, config: any): Promise<void>;
  metaLoaded(module: IModule, meta: any): Promise<void>;
}

export interface IMonkeySystem {
  createContext(context: CabloyContext): void;
}
