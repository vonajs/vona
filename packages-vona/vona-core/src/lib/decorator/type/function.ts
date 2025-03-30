export type FunctionAsync<RESULT> = () => Promise<RESULT>;
export type Next = (data?: any) => Promise<any>;
export type NextSync = (data?: any) => any;
export type NextGeneral = (data?: any) => Promise<any> | any;
export const functionNoop = () => {};
export type FunctionAny = (...args: any[]) => any;
