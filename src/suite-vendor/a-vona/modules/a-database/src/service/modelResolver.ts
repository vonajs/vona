import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

const BeanModuleScope = Symbol('ModelResolver:BeanModuleScope');

@Service()
export class ServiceModelResolver extends BeanBase {
  private [BeanModuleScope]: string;
  private __instances: Record<string, any> = {};

  constructor(moduleScope) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  protected __get__(prop: string) {
    if (!this.__instances[prop]) {
      const beanFullName = `${this[BeanModuleScope]}.model.${prop}`;
      this.__instances[prop] = (this.bean as any)._injectBeanInstanceProp(this, beanFullName, {});
    }
    return this.__instances[prop];
  }
}
