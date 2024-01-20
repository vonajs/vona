import { IErrorObject } from './errorObject.js';

type TypeErrorMethodNames = 'parseFail' | 'parseSuccess';

type TypeErrorMethodCommon = {
  (code: number, ...args: any[]): IErrorObject;
  module: (moduleName: string, code: number, ...args: any[]) => IErrorObject;
};

type TypeErrorMethodFail = {
  (code: number, ...args: any[]): void;
  module: (moduleName: string, code: number, ...args: any[]) => void;
};

type TypeErrorMethodThrow = {
  (code: number, ...args: any[]): never;
  module: (moduleName: string, code: number, ...args: any[]) => never;
};

type TypeErrorMethodSuccess = {
  (data?: any, ...args: any[]): void;
  module: (moduleName: string, data: any, ...args: any[]) => void;
};

type TypeErrorMethodParseCode = {
  (codeDefault: number, code: number, ...args: any[]): IErrorObject;
  module: (moduleName: string, codeDefault: number, code: number, ...args: any[]) => IErrorObject;
};

type TypeErrorMethods = { success: TypeErrorMethodSuccess } & { throw: TypeErrorMethodThrow } & {
  fail: TypeErrorMethodFail;
} & {
    [property in TypeErrorMethodNames]: TypeErrorMethodCommon;
  } & { parseCode: TypeErrorMethodParseCode };

export interface ContextError extends TypeErrorMethods {
  createError: (data: object | Error) => Error;
}
