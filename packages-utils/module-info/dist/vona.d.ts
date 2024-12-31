export type VonaMetaFlavor = 'normal' | keyof VonaMetaFlavorExtend;
export type VonaMetaMode = 'local' | 'prod' | 'unittest';
export interface VonaConfigMeta {
    flavor: VonaMetaFlavor;
    mode: VonaMetaMode;
}
export interface VonaOnionOptionsMeta {
    flavor?: VonaMetaFlavor | VonaMetaFlavor[];
    mode?: VonaMetaMode | VonaMetaMode[];
}
export interface VonaMetaFlavorExtend {
}
//# sourceMappingURL=vona.d.ts.map