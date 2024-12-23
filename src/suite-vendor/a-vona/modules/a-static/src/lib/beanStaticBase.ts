import { BeanBase } from 'vona';

export class BeanStaticBase extends BeanBase {
  protected __get__(prop: string) {
    if (prop === 'get') {
      return (path: string) => {
        return this.app.util.combineStaticPath(this.moduleBelong, path);
      };
    }
  }
}
