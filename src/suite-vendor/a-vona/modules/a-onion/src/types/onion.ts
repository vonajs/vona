import { IDecoratorBeanOptionsBase, PowerPartial } from 'vona';
import { VonaMetaFlavor, VonaMetaMode } from 'vona-shared';

export const SymbolUseOnionLocal = Symbol('SymbolUseOnionLocal');
export const SymbolUseOnionOptions = Symbol('SymbolUseOnionOptions');

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

export interface IOnionOptionsMeta {
  flavor?: VonaMetaFlavor | VonaMetaFlavor[];
  mode?: VonaMetaMode | VonaMetaMode[];
}

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

  export interface CtxMeta {
    /** dynamic onions middleware options */
    onionsDynamic?: PowerPartial<ConfigOnions>;
  }
}
