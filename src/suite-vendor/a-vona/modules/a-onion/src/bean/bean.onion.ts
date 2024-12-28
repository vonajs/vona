import { Bean } from 'vona-module-a-bean';
import { BeanBase, SymbolProxyDisable } from 'vona';
import { matchSelector } from '@cabloy/word-utils';
import {
  IOnionOptionsEnable,
  IOnionOptionsMatch,
  IOnionOptionsMeta,
  TypeOnionOptionsMatchRule,
} from '../types/onion.js';
import { ServiceOnion } from '../service/onion_.js';

@Bean()
export class BeanOnion extends BeanBase {
  protected [SymbolProxyDisable]: boolean = true;
  private __instances: Record<string, any> = {};

  protected __get__(prop: string) {
    if (!this.__instances[prop]) {
      this.__instances[prop] = this.bean._getBeanSelector(ServiceOnion, prop);
    }
    return this.__instances[prop];
  }

  public checkOnionOptionsEnabled(options: IOnionOptionsEnable & IOnionOptionsMatch<string>, selector?: string) {
    if (options.enable === false) return false;
    if (!this.bean.onion.checkOnionOptionsMeta(options.meta)) return false;
    if (!selector) return true;
    if (!options.match && !options.ignore) return true;
    return (
      (options.match && __onionMatchSelector(options.match, selector)) ||
      (options.ignore && !__onionMatchSelector(options.ignore, selector))
    );
  }

  public checkOnionOptionsMeta(meta?: IOnionOptionsMeta) {
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

function __onionMatchSelector(match: TypeOnionOptionsMatchRule<string>, selector: string) {
  return matchSelector(match, selector);
}
