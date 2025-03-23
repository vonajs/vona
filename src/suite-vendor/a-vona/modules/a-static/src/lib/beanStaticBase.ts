import { BeanBase, SymbolModuleBelong } from 'vona';

export class BeanStaticBase extends BeanBase {
  protected __get__(prop: string) {
    if (prop === 'get') {
      return (path: string) => {
        return this.app.util.combineStaticPath(path, this[SymbolModuleBelong]);
      };
    }
  }
}
