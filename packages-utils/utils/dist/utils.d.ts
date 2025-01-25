export declare function deprecated(oldUsage: any, newUsage: any): void;
export declare function catchError<T>(fnMethod: (...args: any[]) => Promise<T>): Promise<[T, undefined] | [undefined, Error]>;
export declare function sleep(ms: any): Promise<unknown>;
export declare function replaceTemplate(content: string, scope: object): string;
export declare function setProperty<T>(obj: object, name: string, value: T): void;
export declare function getProperty<T>(obj: object, name: string, sep?: string): T | undefined;
export declare function getPropertyObject<T>(obj: object, name: string, sep?: string): T | undefined;
export declare function evaluate(expression: string, scope?: object): any;
export declare function createFunction(expression: string, scopeKeys?: string[]): Function;
//# sourceMappingURL=utils.d.ts.map