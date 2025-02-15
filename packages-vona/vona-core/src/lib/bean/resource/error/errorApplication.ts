import type { HttpStatus } from '../../../../types/index.js';
import type { IErrorObject } from './errorObject.js';

type TypeErrorMethodNames = 'parseFail' | 'parseSuccess';

interface TypeErrorMethodCommon {
  (code: number | string, ...args: any[]): IErrorObject;
}

interface TypeErrorMethodFail {
  (code: number | string, ...args: any[]): void;
}

interface TypeErrorMethodThrow {
  (code: HttpStatus | number | string, ...args: any[]): never;
}

interface TypeErrorMethodSuccess {
  (data?: any, ...args: any[]): void;
}

interface TypeErrorMethodParseCode {
  (codeDefault: number, code: number | string, ...args: any[]): IErrorObject;
}

type TypeErrorMethods = { success: TypeErrorMethodSuccess } & { throw: TypeErrorMethodThrow } & {
  fail: TypeErrorMethodFail;
} & {
  [property in TypeErrorMethodNames]: TypeErrorMethodCommon;
} & { parseCode: TypeErrorMethodParseCode };

export interface ApplicationError extends TypeErrorMethods {}
