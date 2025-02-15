import type { VonaOnionOptionsMeta } from '@cabloy/module-info';
import type { IDecoratorBeanOptionsBase, PowerPartial } from 'vona';

export const SymbolUseOnionLocal = Symbol('SymbolUseOnionLocal');
export const SymbolUseOnionOptions = Symbol('SymbolUseOnionOptions');

export type IOnionExecuteCustom = (beanInstance: any, data: any, options: any, next: Function) => any;

export type TypeUseOnionGlobalBaseOptions<T> = Omit<T, 'global' | 'dependencies' | 'dependents' | 'ignore' | 'match'>;

export interface IOnionOptionsEnable {
  enable?: boolean;
  meta?: IOnionOptionsMeta;
}

export type TypeOnionOptionsMatchRule<T> = T | RegExp | (T | RegExp)[];
export interface IOnionOptionsMatch<T extends string> {
  match?: TypeOnionOptionsMatchRule<T>;
  ignore?: TypeOnionOptionsMatchRule<T>;
}

export interface IOnionOptionsDeps<T> {
  dependencies?: T[] | T;
  dependents?: T[] | T;
}

export interface IOnionOptionsMeta extends VonaOnionOptionsMeta {}

export interface IOnionOptionsBase<T extends string> extends IOnionOptionsEnable, IOnionOptionsMatch<T> {}

export interface IOnionSlice<OPTIONS = unknown, ONIONNAME = string, T = unknown> {
  name: ONIONNAME;
  beanOptions: IDecoratorBeanOptionsBase<T, OPTIONS>;
}

export interface ConfigOnions {}

declare module 'vona' {
  export interface VonaConfig {
    onions: ConfigOnions;
  }

  export interface VonaContext {
    get onionsDynamic(): PowerPartial<ConfigOnions> | undefined;
    set onionsDynamic(value: PowerPartial<ConfigOnions> | undefined);
  }
}
