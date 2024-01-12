export interface IMonkeyApp {
  moduleLoading({ module }): Promise<void>;
  moduleLoaded({ module }): Promise<void>;
  configLoaded({ module, config }): Promise<void>;
  metaLoaded({ module, meta }): Promise<void>;
}

export interface IMonkeyModule {
  moduleLoading({ moduleSelf, module }): Promise<void>;
  moduleLoaded({ moduleSelf, module }): Promise<void>;
  configLoaded({ moduleSelf, module, config }): Promise<void>;
  metaLoaded({ moduleSelf, module, meta }): Promise<void>;
}
