import type { LocaleAdapterFn } from './utils.ts';
import { cast } from 'vona';
import { z } from 'zod';

export function setLocaleAdapter(localeAdapterFn: LocaleAdapterFn) {
  cast(z.util).setLocaleAdapter(localeAdapterFn);
}

export function set