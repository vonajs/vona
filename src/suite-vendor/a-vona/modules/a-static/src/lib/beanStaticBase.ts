import { BeanBase, SymbolModuleBelong } from 'vona';

export class BeanStaticBase<TypeStaticGetPath> extends BeanBase {
  get(path: TypeStaticGetPath): string {
    return this.app.util.combineStaticPath(path as string, this[SymbolModuleBelong]);
  }
}
