export interface IModuleLocale {
    (...args: any[]): string;
    locale: (locale: string, ...args: any[]) => string;
}
export type TypeModuleLocales<T extends {
    'zh-cn': object;
}> = {
    [prop in string & keyof T['zh-cn']]: IModuleLocale;
};
//# sourceMappingURL=type.d.ts.map