import { ILocalInfos } from '../../lib/bean/resource/locale/type.js';

export type TypeTextContextLocale = {
  (text: string, ...args: any[]): string;
  locale: <T extends keyof ILocalInfos>(locale: T | undefined, text: string, ...args: any[]) => string;
};

export interface ApplicationText {
  text: TypeTextContextLocale;
}
