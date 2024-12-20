import { BeanSimple } from '../beanSimple.js';

const BeanModuleScope = Symbol('BeanScopeScene#ModuleScope');

export class BeanScopeUtil extends BeanSimple {
  private [BeanModuleScope]: string;

  constructor(moduleScope) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  combineApiPath(path: string | undefined, prefix?: string | boolean, simplify?: boolean) {
    return this.app.meta.util.combineApiPath(this[BeanModuleScope], path, prefix, simplify);
  }

  combineStaticPath(path: string | undefined) {
    return this.app.meta.util.combineStaticPath(this[BeanModuleScope], path);
  }
}
