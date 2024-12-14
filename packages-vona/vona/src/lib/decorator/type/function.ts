export type FunctionAsync<RESULT> = () => Promise<RESULT>;
export type Next = () => Promise<any>;
export type NextSync = () => any;
