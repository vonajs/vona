import { BeanSimple } from '../../bean/beanSimple.js';
export declare class ErrorClass extends BeanSimple {
    ebErrors: any;
    constructor(ebErrors: any);
    success(module: any, data: any, code: any, ...args: any[]): void;
    fail(module: any, code: any, ...args: any[]): void;
    throw(module: any, code: any, ...args: any[]): never;
    parseFail(module: any, code: any, ...args: any[]): any;
    parseSuccess(module: any, code: any, ...args: any[]): {
        code: any;
        message: string;
    };
    parseCode(module: any, codeDefault: any, code: any, ...args: any[]): {
        code: any;
        message: string;
    };
}
//# sourceMappingURL=errorClass.d.ts.map