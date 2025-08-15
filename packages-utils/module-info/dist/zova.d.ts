export type ZovaMetaFlavor = 'front' | 'admin' | 'vonaHome' | 'vonaCabloy' | keyof ZovaMetaFlavorExtend;
export type ZovaMetaMode = 'development' | 'production';
export type ZovaMetaAppMode = 'spa' | 'ssr' | 'pwa' | 'cordova' | 'capacitor' | 'electron' | 'bex' | keyof ZovaMetaAppModeExtend;
export interface ZovaConfigMeta {
    flavor: ZovaMetaFlavor;
    mode: ZovaMetaMode;
    appMode: ZovaMetaAppMode;
}
export interface ZovaOnionOptionsMeta {
    flavor?: ZovaMetaFlavor | ZovaMetaFlavor[];
    mode?: ZovaMetaMode | ZovaMetaMode[];
    appMode?: ZovaMetaAppMode | ZovaMetaAppMode[];
}
export interface ZovaMetaFlavorExtend {
}
export interface ZovaMetaAppModeExtend {
}
