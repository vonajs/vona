import { ConfigInstanceBase, IOnionOptionsDeps, IOnionOptionsEnable, OmitNever, Onion } from 'vona';

export interface IStartupRecord {}

export interface IStartupExecute {
  execute(options?: IInstanceStartupOptions): Promise<void>;
}

export interface IDecoratorStartupOptions extends IOnionOptionsEnable, IOnionOptionsDeps<keyof IStartupRecord> {
  instance?: boolean;
  debounce?: boolean | number;
  transaction?: boolean;
  after?: boolean;
}

export interface IInstanceStartupOptions {
  force?: boolean;
  configInstanceBase?: ConfigInstanceBase;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    startup: ServiceOnion<IDecoratorStartupOptions, keyof IStartupRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    startup: OmitNever<IStartupRecord>;
  }

  export interface ISceneCustomRecord {
    startup: never;
  }
}
