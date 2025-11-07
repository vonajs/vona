import type { IBeanScopeLocale } from '../../type.ts';

export function $localeScope<M extends keyof IBeanScopeLocale, K extends keyof IBeanScopeLocale[M]>(
  moduleName: M,
  key: K,
): `${M}::${K extends string ? K : never}` {
  return `${moduleName}::${String(key)}` as any;
}
