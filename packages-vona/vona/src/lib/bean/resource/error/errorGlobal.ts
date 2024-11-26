declare global {
  export interface Error {
    code?: number | string | undefined;
    status?: number | undefined;
  }
}
export {};
