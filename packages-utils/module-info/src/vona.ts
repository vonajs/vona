export type VonaMetaFlavor = 'normal' | 'docker' | keyof VonaMetaFlavorExtend;
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
