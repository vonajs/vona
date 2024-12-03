import { ConfigInstanceBase } from '../config/instance.js';

export interface IMetaRecord {}

export interface IDecoratorMetaOptions {}

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
