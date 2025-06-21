import { appResource, BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';
import { $columnsAll } from '../lib/columns.ts';

const BeanModuleScope = Symbol('EntityResolver#ModuleScope');

@Service()
export class ServiceEntityResolver extends BeanBase {
  private [BeanModuleScope]: string;
  private __instances: Record<string, any> = {};

  constructor(moduleScope) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  protected __get__(prop: string) {
    if (!this.__instances[prop]) {
      const beanFullName = `${this[BeanModuleScope]}.entity.${prop}`;
      const beanOptions = appResource.getBean(beanFullName)!;
      this.__instances[prop] = $columnsAll(beanOptions.beanClass, true);
    }
    return this.__instances[prop];
  }
}
