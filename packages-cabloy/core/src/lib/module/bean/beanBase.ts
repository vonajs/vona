import { appResource } from '../../core/resource.js';
import { BeanSimple } from '../index.js';

const BeanBaseScope = Symbol('BeanBase#Scope');

export class BeanBase extends BeanSimple {
  protected get bean() {
    return this.ctx.bean;
  }

  protected get scope() {
    if (!this[BeanBaseScope]) {
      const moduleScope = this.moduleBelong;
      const bean = this.ctx ? this.ctx.bean : this.app.bean;
      this[BeanBaseScope] = bean._getBeanScope(`${moduleScope}.scope.module`, moduleScope);
    }
    return this[BeanBaseScope];
  }

  protected get moduleBelong() {
    return appResource._getModuleBelong(this.constructor as any);
  }
}
