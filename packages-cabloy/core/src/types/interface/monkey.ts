import { IModule } from '@cabloy/module-info';

export interface IMonkeyApp {
  moduleLoading({ module }: { module: IModule }): Promise<void>;
  moduleLoaded({ module }: { module: IModule }): Promise<void>;
  configLoaded({ module, config }: { module: IModule; config: unknown }): Promise<void>;
  metaLoaded({ module, meta }): Promise<void>;
}

export interface IModuleMain {
  moduleLoading({ module }: { module: IModule }): Promise<void>;
  moduleLoaded({ module }: { module: IModule }): Promise<void>;
  configLoaded({ module, config }: { module: IModule; config: unknown }): Promise<void>;
  metaLoaded({ module, meta }): Promise<void>;
}

export interface IMonkeyModule {
  moduleLoading({ moduleSelf, module }: { moduleSelf: IModule; module: IModule }): Promise<void>;
  moduleLoaded({ moduleSelf, module }: { moduleSelf: IModule; module: IModule }): Promise<void>;
  configLoaded({
    moduleSelf,
    module,
    config,
  }: {
    moduleSelf: IModule;
    module: IModule;
    config: unknown;
  }): Promise<void>;
  metaLoaded({ moduleSelf, module, meta }: { moduleSelf: IModule; module: IModule; meta: unknown }): Promise<void>;
}
