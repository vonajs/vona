export interface JwtPayload {
  exp: number;
  token: string;
}

export interface ContextState {
  // todo: jwt可能不需要存入此处。因为已经解析出来state.user数据了
  jwt?: JwtPayload; // not use null | undefined
}
