import { VonaMetaFlavor, VonaMetaMode } from 'vona-shared';
import { VonaContext } from '../context/index.js';
import { IDecoratorBeanOptionsBase } from '../../lib/decorator/interface/beanOptions.js';

export const SymbolUseOnionLocal = Symbol('SymbolUseOnionLocal');
export const SymbolUseOnionOptions = Symbol('SymbolUseOnionOptions');

export type TypeUseOnionGlobalBaseOptions<T> = Omit<T, 'global' | 'dependencies' | 'dependents' | 'ignore' | 'match'>;

export interface IOnionOptionsEnable {
  enable?: boolean;
  meta?: IOnionOptionsMeta;
}

export interface IOnionOptionsMeta {
  flavor?: VonaMetaFlavor | VonaMetaFlavor[];
  mode?: VonaMetaMode | VonaMetaMode[];
}

export interface IOnionOptionsBase extends IOnionOptionsEnable {
  match?: ((ctx: VonaContext) => boolean) | RegExp | string;
  ignore?: ((ctx: VonaContext) => boolean) | RegExp | string;
}

// todo: 继承自IOnionSlice
export interface IOnionSlice<OPTIONS = unknown, SLICENAME = string, T = unknown> {
  name: SLICENAME;
  beanOptions: IDecoratorBeanOptionsBase<T, OPTIONS>;
}
