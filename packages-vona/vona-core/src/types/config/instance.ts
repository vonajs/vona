import { VonaConfigOptional } from './config.js';

export interface ConfigInstanceBase {
  subdomain: string;
  password?: string;
  title?: string;
  config?: VonaConfigOptional;
}
