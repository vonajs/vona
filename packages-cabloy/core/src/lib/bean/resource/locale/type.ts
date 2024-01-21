export interface IBeanScopeLocale {
  (...args: any[]): string;
  locale: (locale: string, ...args: any[]) => string;
}

export type TypeBeanScopeLocales<T extends { 'zh-cn': object }> = {
  [prop in string & keyof T['zh-cn']]: IBeanScopeLocale;
};
