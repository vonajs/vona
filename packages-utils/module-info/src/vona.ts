export type VonaMetaFlavor = 'normal' | 'docker' | 'ci' | keyof VonaMetaFlavorExtend;
export type VonaMetaMode = 'local' | 'prod' | 'test';
export interface VonaConfigMeta {
  flavor: VonaMetaFlavor;
  mode: VonaMetaMode;
}

export interface VonaOnionOptionsMeta {
  flavor?: VonaMetaFlavor | VonaMetaFlavor[];
  mode?: VonaMetaMode | VonaMetaMode[];
}

export interface VonaMetaFlavorExtend {}
