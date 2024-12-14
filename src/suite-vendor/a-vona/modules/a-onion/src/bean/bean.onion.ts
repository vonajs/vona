import { Bean, BeanBase, IOnionOptionsMeta, Onion } from 'vona';

@Bean()
export class BeanOnion extends BeanBase {
  private __instances: Record<string, any> = {};

  protected __get__(prop: string) {
    if (!this.__instances[prop]) {
      this.__instances[prop] = this.bean._newBean(Onion, prop);
    }
    return this.__instances[prop];
  }

  public checkOnionSlicOptionsMeta(meta?: IOnionOptionsMeta) {
    // check none
    if (!meta) return true;
    // check flavor
    if (meta.flavor) {
      if (!Array.isArray(meta.flavor) && meta.flavor !== this.app.meta.flavor) return false;
      if (Array.isArray(meta.flavor) && !meta.flavor.includes(this.app.meta.flavor)) return false;
    }
    // check mode
    if (meta.mode) {
      if (!Array.isArray(meta.mode) && meta.mode !== this.app.meta.mode) return false;
      if (Array.isArray(meta.mode) && !meta.mode.includes(this.app.meta.mode)) return false;
    }
    // default
    return true;
  }
}
