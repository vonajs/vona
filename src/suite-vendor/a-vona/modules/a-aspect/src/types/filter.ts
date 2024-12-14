import { IOnionOptionsBase, IOnionOptionsDeps, NextSync, OmitNever, Onion } from 'vona';

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

export interface IDecoratorFilterOptionsGlobal extends IOnionOptionsBase, IOnionOptionsDeps<keyof IFilterRecordGlobal> {
  global: true;
}

export const SymbolFilterComposeContext = Symbol('SymbolFilterComposeContext');

export interface IFilterComposeContext {
  err: Error;
  method: string;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    filter: Onion<IDecoratorFilterOptionsGlobal, keyof IFilterRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    filter: OmitNever<IFilterRecord>;
  }

  export interface ISceneCustomRecord {
    filter: never;
  }
}
