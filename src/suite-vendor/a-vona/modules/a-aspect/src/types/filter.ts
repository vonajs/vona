import type { NextSync, OmitNever } from 'vona';
import type { IOnionOptionsBase, IOnionOptionsDeps, IOnionOptionsEnable, ServiceOnion } from 'vona-module-a-onion';
import type { IApiPathRecord } from 'vona-module-a-web';

export interface IFilterRecordGlobal {}
export interface IFilterRecordLocal {}
export type IFilterRecord = IFilterRecordGlobal & IFilterRecordLocal;

export interface IFilterLog {
  log(err: Error, options: IDecoratorFilterOptions, next: NextSync): Promise<boolean>;
}

export interface IFilterJson {
  json(err: Error, options: IDecoratorFilterOptions, next: NextSync): Promise<boolean>;
}

export interface IFilterHtml {
  html(err: Error, options: IDecoratorFilterOptions, next: NextSync): Promise<boolean>;
}

export interface IDecoratorFilterOptions extends IOnionOptionsEnable {}

export interface IDecoratorFilterOptionsGlobal
  extends IOnionOptionsBase<keyof IApiPathRecord>,
  IOnionOptionsDeps<keyof IFilterRecordGlobal> {
  global: true;
}

export interface IFilterComposeData {
  err: Error;
  method: string;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    filter: ServiceOnion<IFilterRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    filter: OmitNever<IFilterRecord>;
  }

  export interface IBeanSceneRecord {
    filter: never;
  }
}
