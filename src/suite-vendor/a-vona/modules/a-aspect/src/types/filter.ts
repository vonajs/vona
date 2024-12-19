import { NextSync, OmitNever } from 'vona';
import { IOnionOptionsBase, IOnionOptionsDeps, ServiceOnion } from 'vona-module-a-onion';
import { IApiPathRecord } from 'vona-module-a-web';

export interface IFilterRecordGlobal {}
export interface IFilterRecordLocal {}
export type IFilterRecord = IFilterRecordGlobal & IFilterRecordLocal;

export interface IFilterLog {
  log(err: Error, options: IDecoratorFilterOptions, next: NextSync): boolean;
}

export interface IFilterJson {
  json(err: Error, options: IDecoratorFilterOptions, next: NextSync): boolean;
}

export interface IFilterHtml {
  html(err: Error, options: IDecoratorFilterOptions, next: NextSync): boolean;
}

export interface IDecoratorFilterOptions {
  enable?: boolean;
}

export interface IDecoratorFilterOptionsGlobal
  extends IOnionOptionsBase<keyof IApiPathRecord>,
    IOnionOptionsDeps<keyof IFilterRecordGlobal> {
  global: true;
}

export const SymbolFilterComposeContext = Symbol('SymbolFilterComposeContext');

export interface IFilterComposeContext {
  err: Error;
  method: string;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    filter: ServiceOnion<IDecoratorFilterOptionsGlobal, keyof IFilterRecord>;
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
