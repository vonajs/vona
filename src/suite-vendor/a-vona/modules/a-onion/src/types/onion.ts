import { IDecoratorBeanOptionsBase, PowerPartial, VonaContext } from 'vona';
import { VonaMetaFlavor, VonaMetaMode } from 'vona-shared';

export const SymbolUseOnionLocal = Symbol('SymbolUseOnionLocal');
export const SymbolUseOnionOptions = Symbol('SymbolUseOnionOptions');

export type TypeUseOnionGlobalBaseOptions<T> = Omit<T, 'global' | 'dependencies' | 'dependents' | 'ignore' | 'match'>;

export interface IOnionOptionsEnable {
  enable?: boolean;
  meta?: IOnionOptionsMeta;
}

export interface IOnionOptionsDeps<T> {
  dependencies?: T[] | T;
  dependents?: T[] | T;
}

export interface IOnionOptionsMeta {
  flavor?: VonaMetaFlavor | VonaMetaFlavor[];
  mode?: VonaMetaMode | VonaMetaMode[];
}

export interface IOnionOptionsBase extends IOnionOptionsEnable {
  match?: ((ctx: VonaContext) => boolean) | RegExp | string;
  ignore?: ((ctx: VonaContext) => boolean) | RegExp | string;
}

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
