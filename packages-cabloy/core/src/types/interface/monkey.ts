import { IModule } from '@cabloy/module-info';
import { CabloyContext } from '../index.js';

export interface IMonkeyApp {
  moduleLoading(module: IModule): Promise<void>;
  moduleLoaded(module: IModule): Promise<void>;
  configLoaded(module: IModule, config: any): Promise<void>;
  metaLoaded(module: IModule, meta: any): Promise<void>;
}

export interface IModuleMain {
  moduleLoading(module: IModule): Promise<void>;
  moduleLoaded(module: IModule): Promise<void>;
  configLoaded(module: IModule, config: any): Promise<void>;
  metaLoaded(module: IModule, meta: any): Promise<void>;
}

export interface IModuleMainContext {
  createContext(context: CabloyContext): void;
}

export interface IMonkeyModule {
  moduleLoading(moduleSelf: IModule, module: IModule): Promise<void>;
  moduleLoaded(moduleSelf: IModule, module: IModule): Promise<void>;
  configLoaded(moduleSelf: IModule, module: IModule, config: any): Promise<void>;
  metaLoaded(moduleSelf: IModule, module: IModule, meta: any): Promise<void>;
}
