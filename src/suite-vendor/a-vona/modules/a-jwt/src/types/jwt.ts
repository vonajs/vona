import type { SignOptions } from 'jsonwebtoken';

export interface IJwtSceneRecord {
  access: never;
  refresh: never;
  query: never;
}

export interface IJwtSceneOptions {
  secret?: string;
  signOptions: SignOptions;
}

export interface ConfigJwt {
  default: IJwtSceneOptions;
  scenes: Record<keyof IJwtSceneRecord, IJwtSceneOptions>;
}
