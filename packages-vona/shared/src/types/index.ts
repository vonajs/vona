export type MetaMode = 'local' | 'prod' | 'unittest';
export interface VonaConfigMeta {
  flavor: 'default' | string;
  mode: MetaMode;
}
