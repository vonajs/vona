import { VonaMetaFlavor, VonaMetaMode } from 'vona-shared';

export interface IOnionSliceEnable {
  enable?: boolean;
  meta?: IOnionSliceOptionsMeta;
}

export interface IOnionSliceOptionsMeta {
  flavor?: VonaMetaFlavor | VonaMetaFlavor[];
  mode?: VonaMetaMode | VonaMetaMode[];
}

export interface IOnionSliceBase extends IOnionSliceEnable {}
