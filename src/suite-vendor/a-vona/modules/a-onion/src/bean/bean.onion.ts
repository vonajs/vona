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
import { checkMeta } from '@cabloy/utils';

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
    if (!this.checkOnionOptionsMeta(options.meta)) return false;
    if (!selector) return true;
    if (!options.match && !options.ignore) return true;
    return (
      (options.match && __onionMatchSelector(options.match, selector)) ||
      (options.ignore && !__onionMatchSelector(options.ignore, selector))
    );
  }

  public checkOnionOptionsMeta(meta?: IOnionOptionsMeta) {
    return checkMeta(meta, this.app.meta);
  }
}

function __onionMatchSelector(match: TypeOnionOptionsMatchRule<string>, selector: string) {
  return matchSelector(match, selector);
}
