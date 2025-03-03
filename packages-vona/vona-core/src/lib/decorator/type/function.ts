export type FunctionAsync<RESULT> = () => Promise<RESULT>;
export type Next = (data?: any) => Promise<any>;
export type NextSync = (data?: any) => any;
export const functionNoop = () => {};
