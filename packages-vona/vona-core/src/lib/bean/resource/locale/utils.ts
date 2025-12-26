import type { IBeanScopeLocale } from '../../type.ts';
import type { ILocaleMagic } from './type.ts';
import { useApp } from '../../../framework/useApp.ts';
import { LocaleModuleNameSeparator } from './type.ts';

export function $localeScope<M extends keyof IBeanScopeLocale, K extends keyof IBeanScopeLocale[M]>(
  moduleName: M,
  key: K,
  ...args: any[]
): ILocaleMagic<`${M}::${K extends string ? K : never}`> {
  return $makeLocaleMagic(`${moduleName}::${String(key)}`, ...args) as any;
}

export function $makeLocaleMagic<T extends string>(str: T, ...args: any[]): ILocaleMagic<T> {
  return {
    toString() {
      return str;
    },
    toJSON() {
      return _translate(str, ...args);
    },
  } as any;
}

function _translate<T extends string>(str: T, ...args: any[]) {
  if (!str || !str.includes(LocaleModuleNameSeparator)) return str;
  const app = useApp();
  return app.meta.text(str, ...args);
}
