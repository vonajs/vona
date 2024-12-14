import { VonaMetaFlavor, VonaMetaMode } from 'vona-shared';
import { VonaContext } from '../context/index.js';
import { IDecoratorBeanOptionsBase } from '../../lib/decorator/interface/beanOptions.js';

export interface IOnionSliceEnable {
  enable?: boolean;
  meta?: IOnionSliceOptionsMeta;
}

export interface IOnionSliceOptionsMeta {
  flavor?: VonaMetaFlavor | VonaMetaFlavor[];
  mode?: VonaMetaMode | VonaMetaMode[];
}

export interface IOnionSliceBase extends IOnionSliceEnable {
  match?: ((ctx: VonaContext) => boolean) | RegExp | string;
  ignore?: ((ctx: VonaContext) => boolean) | RegExp | string;
}

// todo: 继承自IOnionSlice
export interface IOnionSlice<OPTIONS = unknown, SLICENAME = string, T = unknown> {
  name: SLICENAME;
  beanOptions: IDecoratorBeanOptionsBase<T, OPTIONS>;
}
