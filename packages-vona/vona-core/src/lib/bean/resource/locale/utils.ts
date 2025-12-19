import type { IBeanScopeLocale } from '../../type.ts';
import type { ILocaleMagic } from './type.ts';
import { useApp } from '../../../framework/useApp.ts';

export function $localeScope<M extends keyof IBeanScopeLocale, K extends keyof IBeanScopeLocale[M]>(
  moduleName: M,
  key: K,
): ILocaleMagic<`${M}::${K extends string ? K : never}`> {
  return makeLocaleMagic(`${moduleName}::${String(key)}`) as any;
}

export function makeLocaleMagic<T extends string>(str: T): ILocaleMagic<T> {
  return {
    toString() {
      return str;
    },
    toJSON() {
      const app = useApp();
      return app.meta.text(str);
    },
  } as any;
}
