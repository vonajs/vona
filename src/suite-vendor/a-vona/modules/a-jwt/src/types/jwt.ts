import type { SignOptions } from 'jsonwebtoken';

export interface IJwtToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface IJwtClientRecord {
  temp: never;
  access: never;
  refresh: never;
}

export interface IJwtSignOptions {
  path?: string | string[];
}

export interface IJwtClientOptions {
  secret?: string;
  signOptions: SignOptions;
}

export interface ConfigJwt {
  field: {
    payload: {
      client: string;
      path: string;
      data: string;
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
