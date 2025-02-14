import type { IBeanScopeLocale } from '../../lib/bean/type.js';
import type { PowerPartial } from '../utils/powerPartial.js';

export const localeDefault = {
  modules: {},
};

export type VonaLocale = {
  modules: IBeanScopeLocale;
} & typeof localeDefault;

export type VonaLocaleOptional = PowerPartial<VonaLocale>;
