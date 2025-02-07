import { VonaConfigOptional } from './config.js';

export interface ConfigInstanceBase {
  instanceName: string;
  password?: string;
  title?: string;
  config?: VonaConfigOptional;
}
