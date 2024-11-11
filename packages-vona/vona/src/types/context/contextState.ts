export interface JwtPayload {
  exp: number;
  token: string;
}

export interface ContextState {
  jwt: JwtPayload; // not use null | undefined
  arguments?: any[];
}
