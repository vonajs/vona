export interface IUserBase {}

declare module 'vona' {
  export interface ContextState {
    user?: IUserBase;
  }
}
