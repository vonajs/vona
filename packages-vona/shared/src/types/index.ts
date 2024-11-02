export type VonaMetaFlavor = 'normal' | string;
export type VonaMetaMode = 'local' | 'prod' | 'unittest';
export interface VonaConfigMeta {
  flavor: VonaMetaFlavor;
  mode: VonaMetaMode;
}
