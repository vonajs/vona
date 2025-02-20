import type { VonaConfigOptional } from './config.ts';

export interface ConfigInstanceBase {
  instanceName: string;
  password?: string;
  title?: string;
  config?: VonaConfigOptional;
}
