declare global {
  export interface Error {
    code: number | string;
    status: number | string;
  }
}
export {};
