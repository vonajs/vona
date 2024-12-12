import { appResource } from '../core/resource.js';
import { IDecoratorBeanOptionsBase } from '../decorator/interface/beanOptions.js';
import { BeanSimple } from './beanSimple.js';

export class BeanBaseSimple extends BeanSimple {
  private __beanFullName__: string;

  protected get beanFullName() {
    return this.__beanFullName__;
  }

  protected get onionName() {
    const parts = this.beanFullName.split('.');
    return `${parts[0]}:${parts[2]}`;
  }

  protected get moduleBelong() {
    return appResource._getModuleBelong(this.__beanFullName__);
  }

  protected get beanOptions(): IDecoratorBeanOptionsBase {
    return appResource.getBean(this.__beanFullName__)!;
  }

  protected get onionOptions(): unknown | undefined {
    return this.beanOptions.options;
  }
}
