import type { VonaConfigOptional } from './config.ts';

export interface IInstanceRecord {
  '': never;
}

export interface ConfigInstanceBase {
  name: keyof IInstanceRecord;
  password?: string;
  title?: string;
  config?: VonaConfigOptional;
}
