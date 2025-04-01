import type { IDecoratorModelOptions } from '../types/onion/model.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

const BeanModuleScope = Symbol('ModelResolver:BeanModuleScope');

@Service()
export class ServiceModelResolver extends BeanBase {
  private [BeanModuleScope]: string;

  constructor(moduleScope) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  protected __get__(prop: string) {
    const beanFullName = `${this[BeanModuleScope]}.model.${prop}`;
    const onionName = `${this[BeanModuleScope]}:${prop}`;
    const onionOptions = this.bean.onion.model.getOnionOptions<IDecoratorModelOptions>(onionName as any);
    const clientName = onionOptions?.clientName;
    // clientName
    if (!clientName) {
      return this.bean._getBean(beanFullName as any);
    } else {
      return this.bean._getBeanSelector(beanFullName as any, this.scope.service.database.prepareClientNameSelector({
        level: this.bean.database.current.level,
        clientName,
      }));
    }
  }
}
