import { Bean, BeanBase, Onion } from 'vona';

@Bean()
export class BeanOnion extends BeanBase {
  private __instances: Record<string, any> = {};

  protected __get__(prop: string) {
    if (!this.__instances[prop]) {
      this.__instances[prop] = this.bean._newBean(Onion, prop);
    }
    return this.__instances[prop];
  }
}
