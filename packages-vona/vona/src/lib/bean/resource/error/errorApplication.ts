import { HttpStatus } from '../../../../types/index.js';
import { IErrorObject } from './errorObject.js';

type TypeErrorMethodNames = 'parseFail' | 'parseSuccess';

type TypeErrorMethodCommon = {
  (code: number | string, ...args: any[]): IErrorObject;
  module: (moduleName: string, code: number | string, ...args: any[]) => IErrorObject;
};

type TypeErrorMethodFail = {
  (code: number | string, ...args: any[]): void;
  module: (moduleName: string, code: number | string, ...args: any[]) => void;
};

type TypeErrorMethodThrow = {
  (code: HttpStatus | number | string, ...args: any[]): never;
  module: (moduleName: string, code: number | string, ...args: any[]) => never;
};

type TypeErrorMethodSuccess = {
  (data?: any, ...args: any[]): void;
  module: (moduleName: string, data: any, ...args: any[]) => void;
};

type TypeErrorMethodParseCode = {
  (codeDefault: number, code: number | string, ...args: any[]): IErrorObject;
  module: (moduleName: string, codeDefault: number, code: number | string, ...args: any[]) => IErrorObject;
};

type TypeErrorMethods = { success: TypeErrorMethodSuccess } & { throw: TypeErrorMethodThrow } & {
  fail: TypeErrorMethodFail;
} & {
  [property in TypeErrorMethodNames]: TypeErrorMethodCommon;
} & { parseCode: TypeErrorMethodParseCode };

export interface ApplicationError extends TypeErrorMethods {}
