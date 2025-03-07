import type { SignOptions } from 'jsonwebtoken';

export interface IJwtClientRecord {
  access: never;
  refresh: never;
  query: never;
}

export interface IJwtClientOptions {
  secret?: string;
  signOptions: SignOptions;
}

export interface ConfigJwt {
  default: IJwtClientOptions;
  clients: Record<keyof IJwtClientRecord, IJwtClientOptions>;
}

export interface IJwtPayload {
  client: keyof IJwtClientRecord;
}
