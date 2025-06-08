import type { VonaOnionOptionsMeta } from '@cabloy/module-info';
import type { IDecoratorBeanOptionsBase, IInstanceRecord, PowerPartial } from 'vona';

export const SymbolUseOnionLocal = Symbol('SymbolUseOnionLocal');
export const SymbolUseOnionOptions = Symbol('SymbolUseOnionOptions');

export type IOnionExecuteCustom = (beanInstance: any, data: any, options: any, next: Function) => any;

export type TypeUseOnionOmitOptionsGlobal<T> = Omit<T, 'global' | 'dependencies' | 'dependents' | 'ignore' | 'match'>;
export type TypeUseOnionOmitOptionsEnable<T> = Omit<T, 'enable' | 'meta'>;

export interface IOnionOptionsEnable {
  enable?: boolean;
  meta?: IOnionOptionsMeta;
}

export type TypeOnionOptionsMatchFunction = (this: any, ...args: any[]) => boolean;
export type TypeOnionOptionsMatchRule<T> = T | RegExp | TypeOnionOptionsMatchFunction;
export type TypeOnionOptionsMatchRules<T> = (TypeOnionOptionsMatchRule<T>)[] | TypeOnionOptionsMatchRule<T>;

export interface IOnionOptionsMatch<T> {
  match?: T[] | T;
  ignore?: T[] | T;
}

export interface IOnionOptionsDeps<T> {
  dependencies?: T[] | T;
  dependents?: T[] | T;
}

export interface IOnionOptionsMeta extends VonaOnionOptionsMeta {
  instanceName?: keyof IInstanceRecord | (Array<keyof IInstanceRecord>);
}

export interface IOnionOptionsBase<T extends string> extends IOnionOptionsEnable, IOnionOptionsMatch<TypeOnionOptionsMatchRule<T>> {}

export interface IOnionSlice<OPTIONS = unknown, ONIONNAME = string, T = unknown> {
  name: ONIONNAME;
  beanOptions: IDecoratorBeanOptionsBase<T, OPTIONS>;
}

export interface ConfigOnions {}

declare module 'vona' {
  export interface VonaConfig {
    onions: ConfigOnions;
  }

  export interface ILoggerClientChildRecord {
    onion: never;
  }

  export interface VonaContext {
    get onionsDynamic(): PowerPartial<ConfigOnions> | undefined;
    set onionsDynamic(value: PowerPartial<ConfigOnions> | undefined);
  }
}
