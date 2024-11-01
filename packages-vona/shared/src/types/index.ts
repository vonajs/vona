export type VonaMetaMode = 'local' | 'prod' | 'unittest';
export interface VonaConfigMeta {
  flavor: 'default' | string;
  mode: VonaMetaMode;
}
