import { ConfigInstanceBase, OmitNever, Onion } from 'vona';

export interface IMetaRecord {}

export interface IDecoratorMetaOptions {}

/** meta index */

export type MetaOptionsIndexModuleIndexes = Record<string, string | string[] | undefined>;
export interface IMetaOptionsIndex {
  indexes: MetaOptionsIndexModuleIndexes;
}

export interface IMetaIndexExecute {
  execute(options: IMetaOptionsIndex): Promise<boolean>;
}

/** meta version */
export interface IMetaVersionUpdateOptions {
  version: number;
}

export interface IMetaVersionInitOptions extends ConfigInstanceBase {
  version: number;
}

export interface IMetaVersionTestOptions {
  version: number;
  subdomain: string;
}

export interface IMetaVersionUpdate {
  update(options: IMetaVersionUpdateOptions): Promise<void>;
}

export interface IMetaVersionInit {
  init(options: IMetaVersionInitOptions): Promise<void>;
}

export interface IMetaVersionTest {
  test(options: IMetaVersionTestOptions): Promise<void>;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    meta: Onion<IDecoratorMetaOptions, keyof IMetaRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    meta: OmitNever<IMetaRecord>;
  }

  export interface ISceneCustomRecord {
    meta: never;
  }
}
