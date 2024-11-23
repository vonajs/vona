import { BeanSimple } from '../beanSimple.js';

const BeanModuleScope = Symbol('BeanScopeScene#ModuleScope');

export class BeanScopeUtil extends BeanSimple {
  private [BeanModuleScope]: string;

  constructor(moduleScope) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  combineFetchPath(path: string | undefined, prefix?: string | boolean, simplify?: boolean) {
    return this.app.meta.util.combineFetchPath(this[BeanModuleScope], path, prefix, simplify);
  }
}
