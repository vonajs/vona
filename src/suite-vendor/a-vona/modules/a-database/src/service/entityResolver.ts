import { appResource, BeanBase, cast } from 'vona';
import { getTargetDecoratorRuleColumns } from 'vona-module-a-openapi';
import { Service } from 'vona-module-a-web';

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
      const columns = getTargetDecoratorRuleColumns(beanOptions.beanClass.prototype);
      this.__instances[prop] = { ...columns, $table: cast(beanOptions.options).table };
    }
    return this.__instances[prop];
  }
}
