import { IBeanScopeLocale } from '../../lib/bean/type.js';
import { PowerPartial } from '../utils/powerPartial.js';

export const localeDefault = {
  modules: {},
};

export type CabloyLocale = {
  modules: IBeanScopeLocale;
} & typeof localeDefault;

export type CabloyLocaleOptional = PowerPartial<CabloyLocale>;
