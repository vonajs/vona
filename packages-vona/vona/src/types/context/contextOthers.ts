import { ILocalInfos } from '../../lib/bean/resource/locale/type.js';

export interface ContextOthers {
  subdomains: string[];
  locale: keyof ILocalInfos;
}
