export type VonaMetaMode = 'local' | 'prod' | 'unittest';
export interface VonaConfigMeta {
  flavor: 'normal' | string;
  mode: VonaMetaMode;
}
