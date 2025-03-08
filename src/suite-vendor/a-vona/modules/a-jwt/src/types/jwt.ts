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
  field: {
    payload: {
      client: string;
    };
    extract: {
      header: string;
      headerAuth: string;
      headerAuthScheme: string;
      query: string;
    };
  };
  default: IJwtClientOptions;
  clients: Record<keyof IJwtClientRecord, IJwtClientOptions>;
}

export interface IJwtPayload {}
