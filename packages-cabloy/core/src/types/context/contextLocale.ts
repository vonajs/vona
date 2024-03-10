export type TypeTextContextLocale = {
  (text: string, ...args: any[]): string;
  locale: (locale: string | undefined, text: string, ...args: any[]) => string;
};

export interface ContextLocale {
  text: TypeTextContextLocale;
}
