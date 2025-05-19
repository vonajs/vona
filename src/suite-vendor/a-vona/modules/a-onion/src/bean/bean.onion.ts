import type {
  IOnionOptionsEnable,
  IOnionOptionsMatch,
  IOnionOptionsMeta,
  TypeOnionOptionsMatchRules,
} from '../types/onion.ts';
import { checkMeta } from '@cabloy/utils';
import { matchSelector } from '@cabloy/word-utils';
import { BeanBase, ProxyDisable } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { ServiceOnion } from '../service/onion_.ts';

@ProxyDisable()
@Bean()
export class BeanOnion extends BeanBase {
  private __instances: Record<string, any> = {};

  protected __get__(prop: string) {
    if (!this.__instances[prop]) {
      this.__instances[prop] = this.bean._getBeanSelector(ServiceOnion, prop);
    }
    return this.__instances[prop];
  }

  public checkOnionOptionsEnabled(
    options: IOnionOptionsEnable & IOnionOptionsMatch<any>,
    selector?: string | boolean,
    matchThis?: any,
    ...matchArgs: any[]
  ) {
    if (options.enable === false) return false;
    if (!this.checkOnionOptionsMeta(options.meta)) return false;
    if (!selector) return true;
    if (!options.match && !options.ignore) return true;
    return (
      (options.match && __onionMatchSelector(options.match, selector, matchThis, ...matchArgs)) ||
      (options.ignore && !__onionMatchSelector(options.ignore, selector, matchThis, ...matchArgs))
    );
  }

  public checkOnionOptionsMeta(meta?: IOnionOptionsMeta) {
    return checkMeta(meta, this.app.config.meta);
  }
}

function __onionMatchSelector(match: TypeOnionOptionsMatchRules<string>, selector: string | boolean, matchThis: any, ...matchArgs: any[]) {
  return matchSelector(match, selector, matchThis, ...matchArgs);
}
