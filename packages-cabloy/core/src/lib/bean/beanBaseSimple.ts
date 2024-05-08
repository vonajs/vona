import { appResource } from '../core/resource.js';
import { BeanSimple } from './beanSimple.js';

export class BeanBaseSimple extends BeanSimple {
  private __beanFullName__: string;
  private __moduleBelong__?: string;

  constructor(moduleBelong?: string) {
    super();
    if (moduleBelong && typeof moduleBelong !== 'string') {
      throw new Error(`moduleBelong not valid: ${moduleBelong}`);
    }
    this.__moduleBelong__ = moduleBelong;
  }

  protected get moduleBelong() {
    return this.__moduleBelong__ || appResource._getModuleBelong(this.__beanFullName__);
  }
}
