import { IBeanScopeLocale } from '../../lib/bean/type.js';
import { PowerPartial } from '../utils/powerPartial.js';

export const localeDefault = {
  modules: {},
};

export type VonaLocale = {
  modules: IBeanScopeLocale;
} & typeof localeDefault;

export type VonaLocaleOptional = PowerPartial<VonaLocale>;
