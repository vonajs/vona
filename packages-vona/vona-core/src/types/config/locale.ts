import type { ILocaleRecord } from 'vona';
import type { IBeanScopeLocale } from '../../lib/bean/type.ts';
import type { PowerPartial } from '../utils/powerPartial.ts';

export const localeDefault = {
  modules: {},
};

export type VonaLocale = {
  modules: IBeanScopeLocale;
} & typeof localeDefault;

export type VonaLocaleOptional = PowerPartial<VonaLocale>;
export type VonaLocaleOptionalMap = Record<keyof ILocaleRecord, VonaLocaleOptional>;
