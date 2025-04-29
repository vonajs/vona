import type { SignOptions } from 'jsonwebtoken';

export interface IJwtToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface IJwtClientRecord {
  access: never;
  refresh: never;
  oauth: never;
  oauthstate: never;
  code: never;
}

export interface IJwtSignOptions {
  path?: string | string[];
  dev?: boolean;
  temp?: boolean;
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
      cookie: string;
    };
  };
  tempToken: {
    signOptions: { expiresIn: number };
  };
  default: IJwtClientOptions;
  clients: Record<keyof IJwtClientRecord, IJwtClientOptions>;
}

export interface IPayloadDataBase {}

export interface IJwtPayload {}
