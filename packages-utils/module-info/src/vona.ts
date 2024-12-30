export type VonaMetaFlavor = 'normal' | keyof VonaMetaFlavorExtend;
export type VonaMetaMode = 'local' | 'prod' | 'unittest';
export interface VonaConfigMeta {
  flavor: VonaMetaFlavor;
  mode: VonaMetaMode;
}

export interface VonaMetaFlavorExtend {}
