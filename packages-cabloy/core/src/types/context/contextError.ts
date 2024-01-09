type TypeErrorMethodNames = 'fail' | 'throw' | 'parseFail' | 'parseSuccess';

type TypeErrorMethodCommon = {
  (...args: any[]): void;
  module: (moduleName: string, ...args: any[]) => void;
};

type TypeErrorMethodSuccess = {
  (data: any, ...args: any[]): void;
  module: (moduleName: string, data: any, ...args: any[]) => void;
};

type TypeErrorMethodParseCode = {
  (codeDefault: number, code: number, ...args: any[]): void;
  module: (moduleName: string, codeDefault: number, code: number, ...args: any[]) => void;
};

type TypeErrorMethods = { success: TypeErrorMethodSuccess } & {
  [property in TypeErrorMethodNames]: TypeErrorMethodCommon;
} & { parseCode: TypeErrorMethodParseCode };

export interface ContextError extends TypeErrorMethods {}
